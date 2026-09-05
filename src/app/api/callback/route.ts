import { NextResponse } from "next/server";
import { callbackSchema } from "@/lib/callback-schema";
import { rateLimit } from "@/lib/rate-limit";
import { sendEmail, sendSms } from "@/lib/notify";

export const runtime = "nodejs";

function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim();
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = callbackSchema.safeParse(json);
  if (!parsed.success) {
    const fields = parsed.error.issues.map((i) => String(i.path[0] ?? ""));
    return NextResponse.json({ ok: false, error: "validation", fields }, { status: 400 });
  }
  const data = parsed.data;

  // Honeypot filled: pretend success, do nothing.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const [email, sms] = await Promise.all([sendEmail(data), sendSms(data)]);

  if (!email.sent && !sms.sent) {
    console.error("[callback] No notification delivered", { email, sms, ip });
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, email: email.sent, sms: sms.sent });
}
