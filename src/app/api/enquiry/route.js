import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/request-info";
import { checkIpRateLimit, recordFormSubmission } from "@/lib/rate-limit";

const CRM_API_URL = process.env.CRM_API_URL;
const SITE_URL =
  process.env.SITE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.nidads.com");
const SITE_ORIGIN = new URL(SITE_URL).origin;

const CRM_DOMAIN = process.env.CRM_DOMAIN || "nidads";
const CRM_SOURCE = process.env.SITE_SOURCE || "nidads.com";

const SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

function asText(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

function buildDetails(payload) {
  const parts = [
    payload.source && `Source: ${payload.source}`,
    payload.program && `Program: ${payload.program}`,
    payload.domain && `Domain: ${payload.domain}`,
    payload.experience && `Experience: ${payload.experience}`,
    payload.preferredDate && `Preferred Date: ${payload.preferredDate}`,
    payload.enquiryTypes && `Enquiry Types: ${payload.enquiryTypes}`,
    payload.message && `Message: ${payload.message}`,
    payload.description && `Description: ${payload.description}`,
  ].filter(Boolean);

  return parts.join(" | ");
}

function normalizePayload(payload) {
  const firstName = asText(payload.firstName);
  const lastName = asText(payload.lastName);
  const fullName =
    asText(payload.name) || [firstName, lastName].filter(Boolean).join(" ");
  const email = asText(payload.email);
  const mobile = asText(payload.mobile) || asText(payload.phone);
  const course =
    asText(payload.course) || asText(payload.program) || "General Enquiry";
  const details = buildDetails(payload);

  return {
    name: fullName,
    email,
    mobile,
    course,
    details,
    source: asText(payload.source) || CRM_SOURCE,
  };
}

export async function POST(request) {
  try {
    if (!CRM_API_URL) {
      console.error("CRM_API_URL is undefined; configure it in .env.local");
      return NextResponse.json(
        { success: false, error: "Lead service is not configured" },
        { status: 500 }
      );
    }

    // 1. IP extraction & Strict Rate Limiting (Max 3 requests, block if exceeded)
    const ip = await getClientIp(request);
    const rateCheck = await checkIpRateLimit(ip, {
      type: "enquiry_form",
      limit: 3,
    });

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: rateCheck.error,
          blocked: true,
          remaining: 0,
          limit: rateCheck.limit,
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

    const payload = await request.json().catch(() => null);

    if (!payload || typeof payload !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const normalized = normalizePayload(payload);

    if (!normalized.name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!normalized.email && !normalized.mobile) {
      return NextResponse.json(
        { error: "Email or mobile number is required" },
        { status: 400 }
      );
    }

    // 2. Prepare CRM Payload
    const crmPayload = {
      domain: CRM_DOMAIN,
      source: CRM_SOURCE,
      name: normalized.name,
      full_name: normalized.name,
      email: normalized.email,
      mobile: normalized.mobile,
      phone: normalized.mobile,
      course: normalized.course,
      interested_course: normalized.course,
      remarks: normalized.details || undefined,
    };

    // 3. Submit to CRM
    const crmResponse = await fetch(CRM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: SITE_ORIGIN,
        Referer: `${SITE_ORIGIN}/`,
      },
      body: JSON.stringify(crmPayload),
      cache: "no-store",
    });

    const crmText = await crmResponse.text();
    let crmResult = null;
    if (crmText) {
      try {
        crmResult = JSON.parse(crmText);
      } catch {
        crmResult = null;
      }
    }

    // 4. Optional fallback / backup to Google Apps Script if configured
    if (SCRIPT_URL) {
      fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalized),
        cache: "no-store",
      }).catch((err) => {
        console.warn("Background Google Sheets sync failed:", err.message);
      });
    }

    if (!crmResponse.ok || crmResult?.success === false) {
      console.error("CRM response error:", crmResponse.status, crmText);
      return NextResponse.json(
        {
          success: false,
          error: "Unable to submit enquiry. Please try again later.",
        },
        { status: 502 }
      );
    }

    // 5. Record submission against IP rate limit counter
    await recordFormSubmission(ip, {
      type: "enquiry_form",
      source: CRM_SOURCE,
      course: normalized.course,
      email: normalized.email,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lead submitted successfully",
        leadId: crmResult?.data?.lead?.lead_code || crmResult?.data?.lead?.id,
        remainingAttempts: rateCheck.remaining,
      },
      {
        headers: {
          "X-RateLimit-Limit": String(rateCheck.limit || 3),
          "X-RateLimit-Remaining": String(rateCheck.remaining),
        },
      }
    );
  } catch (error) {
    console.error("POST /api/enquiry failed", error);
    return NextResponse.json(
      { error: "Unable to submit enquiry" },
      { status: 500 }
    );
  }
}
