import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "node:crypto";

const SESSION_COOKIE = "admin_session";
const CSRF_COOKIE = "admin_csrf";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

const cleanValue = (val) => {
  if (typeof val !== "string") return "";
  let v = val.trim();
  // Strip outer quotes if entered in Vercel UI (e.g. "myval" or 'myval')
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v;
};

const getSecret = () => {
  const secret = cleanValue(
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SESSION_SECRET ||
    "nidads-secure-admin-session-secret-fallback-key-32-chars-long"
  );
  return secret;
};

const encodePayload = (payload) => Buffer.from(JSON.stringify(payload)).toString("base64url");
const decodePayload = (encoded) => JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));

const signPayload = (encoded) =>
  crypto.createHmac("sha256", getSecret()).update(encoded).digest("hex");

const safeEqual = (a, b) => {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
};

export const getExpectedAdminUser = () => {
  return cleanValue(
    process.env.ADMIN_USERNAME ||
    process.env.ADMIN_USER ||
    process.env.ADMIN_EMAIL ||
    "admin@example.com"
  );
};

export const getExpectedAdminPass = () => {
  return cleanValue(
    process.env.ADMIN_PASSWORD ||
    process.env.ADMIN_PASS ||
    ""
  );
};

export const validateAdminCredentials = (username, password) => {
  const adminUser = getExpectedAdminUser();
  const adminPass = getExpectedAdminPass();

  if (!adminPass) {
    console.warn(
      "[auth] Warning: ADMIN_PASSWORD is not set in environment variables (Vercel / .env). Admin login will fail."
    );
    return false;
  }

  const inputUser = cleanValue(username);
  const inputPass = typeof password === "string" ? cleanValue(password) : "";
  const rawPass = typeof password === "string" ? password : "";

  // Check username match (case-insensitive & trimmed)
  const isUserMatch = inputUser.toLowerCase() === adminUser.toLowerCase();
  
  // Check password match (supports exact, trimmed, and quote-stripped)
  const isPassMatch = rawPass === adminPass || inputPass === adminPass;

  return isUserMatch && isPassMatch;
};

export const createSessionToken = () => {
  const csrfToken = crypto.randomBytes(32).toString("hex");
  const issuedAt = Date.now();
  const payload = {
    sub: getExpectedAdminUser() || "admin",
    exp: issuedAt + SESSION_TTL_MS,
    iat: issuedAt,
    sid: crypto.randomUUID(),
    csrf: csrfToken,
  };
  const encoded = encodePayload(payload);
  const signature = signPayload(encoded);
  return { token: `${encoded}.${signature}`, csrfToken };
};

export const verifySessionToken = (token) => {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  const expected = signPayload(encoded);
  if (!safeEqual(signature, expected)) {
    return null;
  }
  const payload = decodePayload(encoded);
  if (payload.exp && payload.exp < Date.now()) {
    return null;
  }
  return payload;
};

const resolveMaybePromise = async (value) => {
  if (value && typeof value.then === "function") {
    return await value;
  }
  return value;
};

const getCookieStore = async () => {
  try {
    return await resolveMaybePromise(cookies());
  } catch (error) {
    console.warn("getCookieStore: cookies() unavailable in this context", error);
    return null;
  }
};

export const getAdminSession = async () => {
  const store = await getCookieStore();
  if (!store || typeof store.get !== "function") {
    return null;
  }
  const cookie = store.get(SESSION_COOKIE)?.value;
  return verifySessionToken(cookie);
};

export const requireAdminUser = async () => {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
};

export const ensureAdminApi = async (request, { requireCsrf = true } = {}) => {
  const session = await getAdminSession();
  if (!session) {
    return null;
  }
  if (!requireCsrf) {
    return session;
  }

  const resolvedRequest = await resolveMaybePromise(request);
  const csrfHeader = resolvedRequest?.headers?.get?.("x-csrf-token");
  const store = await getCookieStore();
  const csrfCookie = store?.get(CSRF_COOKIE)?.value;

  if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie || csrfCookie !== session.csrf) {
    return null;
  }
  return session;
};

export const setAdminSessionCookie = (response) => {
  const { token, csrfToken } = createSessionToken();
  response.cookies.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    maxAge: SESSION_TTL_MS / 1000,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  response.cookies.set({
    name: CSRF_COOKIE,
    value: csrfToken,
    httpOnly: false,
    sameSite: "lax",
    maxAge: SESSION_TTL_MS / 1000,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
};

export const clearAdminSessionCookie = (response) => {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    maxAge: 0,
    path: "/",
  });
  response.cookies.set({
    name: CSRF_COOKIE,
    value: "",
    maxAge: 0,
    path: "/",
  });
};
