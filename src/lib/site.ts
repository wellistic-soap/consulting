export const SITE_NAME = "Groundwork"; // TODO: replace with final company name
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export type VerticalKey = "dealers" | "homeServices" | "dental" | "auto" | "gyms";

export const VERTICALS: { key: VerticalKey; path: string }[] = [
  { key: "dealers", path: "/dealers" },
  { key: "homeServices", path: "/home-services" },
  { key: "dental", path: "/dental" },
  { key: "auto", path: "/auto" },
  { key: "gyms", path: "/gyms" },
];

export const PAGE_PATHS = [
  "/",
  ...VERTICALS.map((v) => v.path),
  "/pricing",
  "/callback",
  "/privacy",
  "/terms",
] as const;
