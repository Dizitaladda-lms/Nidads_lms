import { NextResponse } from "next/server";
import {
  checkAdminCredentials,
  clearAdminSessionCookie,
  ensureAdminApi,
  setAdminSessionCookie,
} from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { recordAudit } from "@/lib/audit";
import { getClientIp } from "@/lib/request-info";

const LOGIN_WINDOW_MS = 60_000;
const LOGIN_ATTEMPT_LIMIT = 10;

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
        { error: "Too many login attempts. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { username, password } = body;

    const check = checkAdminCredentials(username, password);

    if (!check.ok) {
      try {
        await recordAudit("admin.login.failed", { actor: username, ip });
      } catch (auditErr) {
        console.error("Audit log failed:", auditErr);
      }

      const status = check.reason === "MISSING_ENV_PASSWORD" ? 500 : 401;
      return NextResponse.json({ error: check.message }, { status });
    }

    const response = NextResponse.json({ ok: true });
    setAdminSessionCookie(response);

    try {
      await recordAudit("admin.login.success", { actor: username, ip });
    } catch (auditErr) {
      console.error("Audit log failed:", auditErr);
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
