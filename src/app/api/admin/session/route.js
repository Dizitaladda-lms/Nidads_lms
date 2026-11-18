import { NextResponse } from "next/server";
import {
  checkAdminCredentials,
  clearAdminSessionCookie,
  ensureAdminApi,
  setAdminSessionCookie,
} from "@/lib/auth";
import { checkIpRateLimit, recordFormSubmission } from "@/lib/rate-limit";
import { recordAudit } from "@/lib/audit";
import { getClientIp } from "@/lib/request-info";

export async function POST(request) {
  try {
    const ip = await getClientIp(request);

    // Strict Rate Limit: Max 3 requests per IP, block if exceeded
    const rateCheck = await checkIpRateLimit(ip, {
      type: "admin_login",
      limit: 3,
    });

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: rateCheck.error,
          blocked: true,
          remaining: 0,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfter || 86400),
            "X-RateLimit-Limit": String(rateCheck.limit || 3),
            "X-RateLimit-Remaining": "0",
          },
        }
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

      // Record failed attempt towards IP limit
      await recordFormSubmission(ip, {
        type: "admin_login_failed",
        actor: username,
      });

      const status = check.reason === "MISSING_ENV_PASSWORD" ? 500 : 401;
      return NextResponse.json(
        {
          error: check.message,
          remainingAttempts: rateCheck.remaining,
        },
        {
          status,
          headers: {
            "X-RateLimit-Limit": String(rateCheck.limit || 3),
            "X-RateLimit-Remaining": String(rateCheck.remaining),
          },
        }
      );
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
