import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/request-info";
import { checkIpRateLimit, recordFormSubmission } from "@/lib/rate-limit";

const CRM_API_URL = process.env.CRM_API_URL;
const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
const SITE_URL =
  process.env.SITE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.nidads.com");
const SITE_ORIGIN = new URL(SITE_URL).origin;
const CRM_DOMAIN = process.env.CRM_DOMAIN || "nidads";
const CRM_SOURCE = process.env.SITE_SOURCE || "nidads.com";
const DELIVERY_TIMEOUT_MS = 10_000;

function asText(value) {
  return typeof value === "string" ? value.trim() : "";
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

  return {
    name: asText(payload.name) || [firstName, lastName].filter(Boolean).join(" "),
    email: asText(payload.email),
    mobile: asText(payload.mobile) || asText(payload.phone),
    course: asText(payload.course) || asText(payload.program) || "General Enquiry",
    details: buildDetails(payload),
    source: asText(payload.source) || CRM_SOURCE,
  };
}

async function readResponseBody(response) {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function sendToCrm(normalized) {
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

  const response = await fetch(CRM_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: SITE_ORIGIN,
      Referer: `${SITE_ORIGIN}/`,
    },
    body: JSON.stringify(crmPayload),
    cache: "no-store",
    signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
  });
  const result = await readResponseBody(response);

  if (!response.ok || result?.success === false) {
    throw new Error(`CRM returned HTTP ${response.status}`);
  }

  return result;
}

async function sendToGoogleSheet(normalized) {
  const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(normalized),
    cache: "no-store",
    signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
  });
  const result = await readResponseBody(response);

  if (!response.ok || result?.success === false) {
    throw new Error(`Google Sheets endpoint returned HTTP ${response.status}`);
  }
}

async function attemptDelivery(name, deliver) {
  try {
    return { name, ok: true, result: await deliver() };
  } catch (error) {
    console.error(`[enquiry] ${name} delivery failed:`, error.message);
    return { name, ok: false };
  }
}

export async function POST(request) {
  try {
    if (!CRM_API_URL && !GOOGLE_APPS_SCRIPT_URL) {
      console.error("Neither CRM_API_URL nor GOOGLE_APPS_SCRIPT_URL is configured");
      return NextResponse.json(
        { success: false, error: "Lead service is not configured" },
        { status: 500 }
      );
    }

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
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    const normalized = normalizePayload(payload);
    if (!normalized.name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    if (!normalized.email && !normalized.mobile) {
      return NextResponse.json(
        { success: false, error: "Email or mobile number is required" },
        { status: 400 }
      );
    }

    const deliveries = await Promise.all([
      CRM_API_URL
        ? attemptDelivery("CRM", () => sendToCrm(normalized))
        : Promise.resolve({ name: "CRM", ok: false }),
      GOOGLE_APPS_SCRIPT_URL
        ? attemptDelivery("Google Sheets", () => sendToGoogleSheet(normalized))
        : Promise.resolve({ name: "Google Sheets", ok: false }),
    ]);
    const successfulDeliveries = deliveries.filter((delivery) => delivery.ok);

    if (successfulDeliveries.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Unable to submit enquiry. Please try again later.",
        },
        { status: 502 }
      );
    }

    await recordFormSubmission(ip, {
      type: "enquiry_form",
      source: CRM_SOURCE,
      course: normalized.course,
      email: normalized.email,
    });

    const crmDelivery = deliveries.find((delivery) => delivery.name === "CRM");
    const lead = crmDelivery?.ok ? crmDelivery.result?.data?.lead : null;

    return NextResponse.json(
      {
        success: true,
        message: "Lead submitted successfully",
        leadId: lead?.lead_code || lead?.id,
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
      { success: false, error: "Unable to submit enquiry" },
      { status: 500 }
    );
  }
}
