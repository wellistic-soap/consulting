export const SITE_NAME = "Hecho AI";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

/** Cris's Calendly booking link. Every CTA on the site points here. */
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/REPLACE_ME"; // TODO: set in Vercel

export type VerticalKey = "dealers" | "homeServices" | "dental" | "auto" | "gyms" | "agencies";

export const VERTICALS: { key: VerticalKey; path: string }[] = [
  { key: "dealers", path: "/dealers" },
  { key: "homeServices", path: "/home-services" },
  { key: "dental", path: "/dental" },
  { key: "auto", path: "/auto" },
  { key: "gyms", path: "/gyms" },
  { key: "agencies", path: "/agencies" },
];

/** Verticals that have a real hero image in public/images/heroes. Others show the placeholder. */
export const HERO_IMAGES: ReadonlySet<VerticalKey> = new Set(["dealers", "homeServices", "dental", "auto", "gyms", "agencies"]);

export const PAGE_PATHS = ["/", ...VERTICALS.map((v) => v.path), "/pricing", "/privacy", "/terms"] as const;

/** Calendly link tagged with where the click came from, visible in Calendly's UTM fields. */
export function bookingHref(opts: { vertical?: VerticalKey | string; locale?: string } = {}) {
  const url = new URL(CALENDLY_URL);
  url.searchParams.set("utm_source", "site");
  if (opts.vertical) url.searchParams.set("utm_campaign", opts.vertical);
  if (opts.locale) url.searchParams.set("utm_content", opts.locale);
  return url.toString();
}
