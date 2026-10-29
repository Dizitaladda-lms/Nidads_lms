import { NextResponse } from "next/server";
import {
  clearAdminSessionCookie,
  ensureAdminApi,
  getExpectedAdminPass,
  getExpectedAdminUser,
  setAdminSessionCookie,
  validateAdminCredentials,
} from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { recordAudit } from "@/lib/audit";
import { getClientIp } from "@/lib/request-info";

const LOGIN_WINDOW_MS = 60_000;
const LOGIN_ATTEMPT_LIMIT = 5;

export async function POST(request) {
  try {
    const ip = await getClientIp(request);
    const isAllowed = rateLimit({
      key: `admin-login:${ip}`,
      limit: LOGIN_ATTEMPT_LIMIT,
      windowMs: LOGIN_WINDOW_MS,
    });

    if (!isAllowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { username, password } = body;

    const expectedPass = getExpectedAdminPass();
    if (!expectedPass) {
      console.error("[auth] ADMIN_PASSWORD environment variable is missing on Vercel.");
      return NextResponse.json(
        {
          error:
            "Vercel Environment Variable 'ADMIN_PASSWORD' set nahi hai! Kripya Vercel Dashboard -> Settings -> Environment Variables me ADMIN_PASSWORD add karein aur project ko Redeploy karein.",
        },
        { status: 500 }
      );
    }

    if (!validateAdminCredentials(username, password)) {
      try {
        await recordAudit("admin.login.failed", { actor: username, ip });
      } catch (e) {
        console.error("Audit log failed:", e);
      }

      return NextResponse.json(
        { error: "Invalid username or password. Please verify your credentials." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ ok: true });
    setAdminSessionCookie(response);

    try {
      await recordAudit("admin.login.success", { actor: username, ip });
    } catch (e) {
      console.error("Audit log failed:", e);
    }

    return response;
  } catch (error) {
    console.error("[admin.session.login] uncaught error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error occurred during login." },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const session = await ensureAdminApi(request, { requireCsrf: true });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    clearAdminSessionCookie(response);
    const ip = await getClientIp(request);
    try {
      await recordAudit("admin.logout", { actor: session.sub, ip });
    } catch (e) {
      console.error("Audit log failed:", e);
    }
    return response;
  } catch (error) {
    console.error("[admin.session.logout] uncaught error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
