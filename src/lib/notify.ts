import { Resend } from "resend";
import type { CallbackInput } from "./callback-schema";
import { SITE_NAME } from "./site";

const LABELS: Record<string, string> = {
  dealers: "Equipment dealer",
  homeServices: "Home services",
  dental: "Dental / ortho group",
  auto: "Auto shop / chain",
  gyms: "Gym / fitness chain",
  other: "Other",
  under2m: "Under $2M",
  "2m-5m": "$2M to $5M",
  "5m-20m": "$5M to $20M",
  "20m+": "$20M+",
  morning: "Morning (8-11)",
  midday: "Midday (11-2)",
  afternoon: "Afternoon (2-5)",
  evening: "Evening (5-7)",
  any: "Any time",
  en: "English",
  es: "Spanish",
};

const label = (v: string) => LABELS[v] ?? v;

export function formatSms(d: CallbackInput) {
  const lines = [
    `New callback request (${SITE_NAME})`,
    `${d.name} at ${d.business}`,
    `${d.phone} (${label(d.language)}, ${label(d.bestTime)})`,
    `${label(d.vertical)} | ${d.locations} loc | ${label(d.revenue)}`,
  ];
  if (d.message) lines.push(`Msg: ${d.message.slice(0, 200)}`);
  return lines.join("\n");
}

export function formatEmail(d: CallbackInput) {
  const rows: [string, string][] = [
    ["Name", d.name],
    ["Business", d.business],
    ["Phone", d.phone],
    ["Preferred language", label(d.language)],
    ["Best time to call", label(d.bestTime)],
    ["Type of business", label(d.vertical)],
    ["Locations", d.locations],
    ["Annual revenue", label(d.revenue)],
    ["Site language", label(d.locale)],
    ["Message", d.message || "(none)"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const html = `<h2 style="font-family:sans-serif">New callback request</h2>
<table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#555">${esc(k)}</td><td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`,
    )
    .join("")}</table>`;
  return { text, html, subject: `Callback: ${d.name}, ${d.business} (${label(d.vertical)})` };
}

export async function sendEmail(d: CallbackInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL;
  if (!apiKey || !to) {
    console.warn("[callback] RESEND_API_KEY or LEAD_EMAIL missing; email not sent");
    return { sent: false as const, reason: "not_configured" as const };
  }
  const resend = new Resend(apiKey);
  const { subject, text, html } = formatEmail(d);
  const from = process.env.LEAD_FROM || `${SITE_NAME} <onboarding@resend.dev>`;
  const { error } = await resend.emails.send({ from, to, subject, text, html });
  if (error) {
    console.error("[callback] Resend error", error);
    return { sent: false as const, reason: "error" as const };
  }
  return { sent: true as const };
}

export async function sendSms(d: CallbackInput) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  const to = process.env.CRIS_PHONE;
  if (!sid || !token || !from || !to) {
    console.warn("[callback] Twilio env vars missing; SMS skipped, email only");
    return { sent: false as const, reason: "not_configured" as const };
  }
  // Direct REST call keeps the serverless bundle small (no twilio SDK).
  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const body = new URLSearchParams({ From: from, To: to, Body: formatSms(d) });
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  if (!res.ok) {
    console.error("[callback] Twilio error", res.status, await res.text());
    return { sent: false as const, reason: "error" as const };
  }
  return { sent: true as const };
}
