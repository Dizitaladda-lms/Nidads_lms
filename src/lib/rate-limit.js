import prisma from "@/lib/prisma";

// Configurable constants with sensible defaults
const DEFAULT_LIMIT = 3; // Maximum 3 requests per IP
const DEFAULT_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours window
const DEFAULT_BLOCK_MS = 24 * 60 * 60 * 1000; // 24 hours IP block

const getEnvNumber = (key, fallback) => {
  const val = process.env[key];
  if (val && !isNaN(Number(val))) {
    return Number(val);
  }
  return fallback;
};

const getLimitConfig = (customLimit) => {
  const limit = customLimit || getEnvNumber("FORM_RATE_LIMIT_MAX", DEFAULT_LIMIT);
  const windowMs = getEnvNumber("FORM_RATE_LIMIT_WINDOW_MS", DEFAULT_WINDOW_MS);
  const blockDurationMs = getEnvNumber("FORM_RATE_LIMIT_BLOCK_MS", DEFAULT_BLOCK_MS);
  return { limit, windowMs, blockDurationMs };
};

// Global in-memory storage (persists across warm serverless requests)
const getHistoryStore = () => {
  const key = "__NIDADS_RATE_LIMIT_HISTORY__";
  if (!globalThis[key]) {
    globalThis[key] = new Map();
  }
  return globalThis[key];
};

const getBlockedStore = () => {
  const key = "__NIDADS_BLOCKED_IPS__";
  if (!globalThis[key]) {
    globalThis[key] = new Map();
  }
  return globalThis[key];
};

// Check if IP is in the bypass whitelist
const isIpWhitelisted = (ip) => {
  if (!ip) return false;
  const whitelistEnv = process.env.RATE_LIMIT_BYPASS_IPS || process.env.ADMIN_WHITELIST_IPS || "";
  if (!whitelistEnv) return false;
  const ips = whitelistEnv.split(",").map((item) => item.trim());
  return ips.includes(ip);
};

/**
 * Checks database for past blocked status or submission counts with a fast 1200ms timeout.
 * Prevents hanging if the DB connection is slow or cold.
 */
const checkDatabaseRateLimit = async (ip, windowMs, blockDurationMs) => {
  if (!prisma || !prisma.adminAudit) {
    return null;
  }

  try {
    const dbPromise = (async () => {
      const now = Date.now();
      const blockCutoff = new Date(now - blockDurationMs);
      const windowCutoff = new Date(now - windowMs);

      // Check if IP is recorded as blocked in AdminAudit
      const blockedRecord = await prisma.adminAudit.findFirst({
        where: {
          ip,
          action: "ip.blocked",
          createdAt: { gte: blockCutoff },
        },
        orderBy: { createdAt: "desc" },
      });

      if (blockedRecord) {
        return { isBlocked: true, record: blockedRecord };
      }

      // Count submissions in current window
      const count = await prisma.adminAudit.count({
        where: {
          ip,
          action: { in: ["form.submission", "enquiry.submitted", "admin.login.failed"] },
          createdAt: { gte: windowCutoff },
        },
      });

      return { isBlocked: false, count };
    })();

    // Timeout after 1200ms to avoid blocking API responses
    const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 1200));
    return await Promise.race([dbPromise, timeoutPromise]);
  } catch (error) {
    console.warn("[rate-limit] database check skipped:", error?.message || error);
    return null;
  }
};

/**
 * Block an IP address in-memory and asynchronously record it in the database.
 */
export const blockIp = (ip, { blockDurationMs, reason = "Limit of 3 requests exceeded", count = 3 } = {}) => {
  if (!ip || isIpWhitelisted(ip)) return;

  const blockedStore = getBlockedStore();
  const now = Date.now();
  const duration = blockDurationMs || DEFAULT_BLOCK_MS;
  const expiresAt = now + duration;

  blockedStore.set(ip, {
    blockedAt: now,
    expiresAt,
    reason,
    count,
  });

  // Asynchronously record in database audit (non-blocking)
  if (prisma?.adminAudit) {
    prisma.adminAudit
      .create({
        data: {
          action: "ip.blocked",
          entity: "rate-limit",
          ip,
          metadata: {
            reason,
            count,
            blockedAt: new Date(now).toISOString(),
            expiresAt: new Date(expiresAt).toISOString(),
          },
        },
      })
      .catch((err) => {
        console.warn("[rate-limit] failed to persist blocked IP to DB:", err?.message);
      });
  }
};

/**
 * Check whether an IP is currently blocked.
 */
export const isIpBlocked = (ip) => {
  if (!ip || isIpWhitelisted(ip)) return false;

  const blockedStore = getBlockedStore();
  const entry = blockedStore.get(ip);
  if (!entry) return false;

  const now = Date.now();
  if (entry.expiresAt > now) {
    return true;
  }

  // Block expired, remove from blocked map
  blockedStore.delete(ip);
  return false;
};

/**
 * Main IP Rate Limit & Blocking Checker:
 * - Allows maximum 3 requests per IP.
 * - If request count >= 3, automatically BLOCKS the IP.
 * - Subsequent requests from this IP receive blocked = true and allowed = false.
 */
export const checkIpRateLimit = async (ip, options = {}) => {
  const { limit, windowMs, blockDurationMs } = getLimitConfig(options.limit);
  const type = options.type || "form";

  if (!ip || isIpWhitelisted(ip)) {
    return {
      allowed: true,
      blocked: false,
      remaining: limit,
      count: 0,
      limit,
      ip,
    };
  }

  const blockedStore = getBlockedStore();
  const historyStore = getHistoryStore();
  const now = Date.now();

  // 1. Check in-memory blocked store
  const blockedEntry = blockedStore.get(ip);
  if (blockedEntry) {
    if (blockedEntry.expiresAt > now) {
      const retryAfter = Math.ceil((blockedEntry.expiresAt - now) / 1000);
      return {
        allowed: false,
        blocked: true,
        remaining: 0,
        count: blockedEntry.count || limit,
        limit,
        retryAfter,
        ip,
        error: `Aapki IP address (${ip}) se maximum limit (max ${limit} requests) exceed ho chuki hai. Aapki IP ko block kar diya gaya hai. Kripya baad me try karein. (Too many requests. Your IP has been blocked after exceeding ${limit} requests limit.)`,
      };
    }
    // Block duration has expired
    blockedStore.delete(ip);
  }

  // 2. Check in-memory request history for this IP
  const windowStart = now - windowMs;
  const history = (historyStore.get(ip) || []).filter((entry) => entry.timestamp > windowStart);

  // 3. Fast database sync check (for cluster/serverless persistence)
  const dbData = await checkDatabaseRateLimit(ip, windowMs, blockDurationMs);
  if (dbData?.isBlocked) {
    blockIp(ip, { blockDurationMs, reason: "Blocked in database history", count: limit });
    return {
      allowed: false,
      blocked: true,
      remaining: 0,
      count: limit,
      limit,
      retryAfter: Math.ceil(blockDurationMs / 1000),
      ip,
      error: `Aapki IP address (${ip}) se maximum limit (max ${limit} requests) exceed ho chuki hai. Aapki IP ko block kar diya gaya hai.`,
    };
  }

  // Combined count (in-memory + database)
  const dbCount = dbData?.count || 0;
  const totalCount = Math.max(history.length, dbCount);

  // If this IP has already reached or exceeded the limit of 3 requests:
  if (totalCount >= limit) {
    // Block IP immediately!
    blockIp(ip, { blockDurationMs, reason: `Exceeded ${limit} requests limit on ${type}`, count: totalCount });

    const retryAfter = Math.ceil(blockDurationMs / 1000);
    return {
      allowed: false,
      blocked: true,
      remaining: 0,
      count: totalCount,
      limit,
      retryAfter,
      ip,
      error: `Aapki IP address (${ip}) se maximum limit (max ${limit} requests) exceed ho chuki hai. Aapki IP ko block kar diya gaya hai. Kripya baad me try karein. (Too many requests. Your IP has been blocked after exceeding ${limit} requests.)`,
    };
  }

  // Request is allowed within the limit
  return {
    allowed: true,
    blocked: false,
    remaining: Math.max(0, limit - totalCount - 1),
    count: totalCount,
    limit,
    ip,
  };
};

/**
 * Records a form submission against an IP address.
 * Increments count and blocks IP if count reaches maximum limit.
 */
export const recordFormSubmission = async (ip, details = {}) => {
  if (!ip || isIpWhitelisted(ip)) return;

  const { limit, windowMs, blockDurationMs } = getLimitConfig();
  const historyStore = getHistoryStore();
  const now = Date.now();
  const windowStart = now - windowMs;

  const history = (historyStore.get(ip) || []).filter((entry) => entry.timestamp > windowStart);
  history.push({ timestamp: now, ...details });
  historyStore.set(ip, history);

  // If new count reaches or exceeds limit, block IP immediately!
  if (history.length >= limit) {
    blockIp(ip, {
      blockDurationMs,
      reason: `Reached ${limit} requests limit on ${details.type || "form"}`,
      count: history.length,
    });
  }

  // Persist submission to database audit log (non-blocking)
  if (prisma?.adminAudit) {
    prisma.adminAudit
      .create({
        data: {
          action: "form.submission",
          entity: details.type || "form",
          ip,
          metadata: {
            ...details,
            submissionCount: history.length,
            timestamp: new Date(now).toISOString(),
          },
        },
      })
      .catch((err) => {
        console.warn("[rate-limit] failed to record submission audit:", err?.message);
      });
  }
};

/**
 * Helper to manually unblock an IP address
 */
export const unblockIp = (ip) => {
  if (!ip) return;
  getBlockedStore().delete(ip);
  getHistoryStore().delete(ip);
};

/**
 * Returns list of currently active blocked IPs
 */
export const getBlockedIps = () => {
  const blockedStore = getBlockedStore();
  const now = Date.now();
  const list = [];
  for (const [ip, data] of blockedStore.entries()) {
    if (data.expiresAt > now) {
      list.push({ ip, ...data });
    } else {
      blockedStore.delete(ip);
    }
  }
  return list;
};

/**
 * Backwards compatibility for previous rateLimit helper
 */
export const rateLimit = ({ key, limit, windowMs }) => {
  const store = getHistoryStore();
  const now = Date.now();
  const windowStart = now - (windowMs || 60_000);
  const entry = (store.get(key) || []).filter((item) => (item.timestamp || item) > windowStart);

  if (entry.length >= (limit || DEFAULT_LIMIT)) {
    return false;
  }

  entry.push({ timestamp: now });
  store.set(key, entry);
  return true;
};
