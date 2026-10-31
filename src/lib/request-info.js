import { headers } from "next/headers";

const resolveMaybePromise = async (value) => {
  if (value && typeof value.then === "function") {
    return await value;
  }
  return value;
};

const readHeader = (source, name) => {
  if (!source || typeof source.get !== "function") {
    return null;
  }
  return source.get(name);
};

/**
 * Normalizes an IP address:
 * - Extracts first IP from comma-separated proxy chains
 * - Strips IPv4-mapped IPv6 prefix (::ffff:)
 * - Strips port numbers (e.g. 1.2.3.4:5678 or [::1]:5678)
 * - Converts ::1 to 127.0.0.1
 */
export const normalizeIp = (rawIp) => {
  if (!rawIp || typeof rawIp !== "string") {
    return "unknown";
  }

  let ip = rawIp.trim();

  // If comma-separated list (from x-forwarded-for: "client, proxy1, proxy2")
  if (ip.includes(",")) {
    ip = ip.split(",")[0].trim();
  }

  // Remove IPv6-mapped IPv4 prefix (::ffff:192.168.1.1)
  if (ip.startsWith("::ffff:")) {
    ip = ip.slice(7).trim();
  }

  // If bracketed IPv6 with port: [2001:db8::1]:8080
  const bracketMatch = ip.match(/^\[([a-fA-F0-9:]+)\](?::\d+)?$/);
  if (bracketMatch) {
    ip = bracketMatch[1];
  } else if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/.test(ip)) {
    // IPv4 with port: 192.168.1.1:8080
    ip = ip.split(":")[0];
  }

  if (ip === "::1") {
    ip = "127.0.0.1";
  }

  return ip || "unknown";
};

export const getClientIp = async (request) => {
  const resolvedRequest = await resolveMaybePromise(request);
  let headerSource = resolvedRequest?.headers;

  if (!headerSource) {
    try {
      const incoming = await headers();
      headerSource = incoming;
    } catch (error) {
      console.warn("getClientIp: unable to access headers", error);
    }
  }

  // 1. NextRequest direct property (e.g. request.ip)
  if (resolvedRequest?.ip && typeof resolvedRequest.ip === "string" && resolvedRequest.ip.trim()) {
    return normalizeIp(resolvedRequest.ip);
  }

  // 2. Cloudflare Connecting IP
  const cf = readHeader(headerSource, "cf-connecting-ip");
  if (cf) {
    return normalizeIp(cf);
  }

  // 3. Vercel Forwarded / Client IP headers
  const vercelForwarded = readHeader(headerSource, "x-vercel-forwarded-for");
  if (vercelForwarded) {
    return normalizeIp(vercelForwarded);
  }
  const vercelIp = readHeader(headerSource, "x-vercel-ip");
  if (vercelIp) {
    return normalizeIp(vercelIp);
  }

  // 4. Standard X-Forwarded-For (client IP is always the first one before proxy hops)
  const forwarded = readHeader(headerSource, "x-forwarded-for");
  if (forwarded) {
    return normalizeIp(forwarded);
  }

  // 5. X-Real-IP
  const realIp = readHeader(headerSource, "x-real-ip");
  if (realIp) {
    return normalizeIp(realIp);
  }

  return "unknown";
};
