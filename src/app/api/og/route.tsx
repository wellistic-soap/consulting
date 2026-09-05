import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { SITE_NAME } from "@/lib/site";

export const runtime = "edge";

const MESSAGES = { en, es } as const;
type MetaKey = keyof typeof en.meta;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const locale = searchParams.get("locale") === "es" ? "es" : "en";
  const pageParam = searchParams.get("page") ?? "home";
  const page: MetaKey = pageParam in en.meta ? (pageParam as MetaKey) : "home";
  const m = MESSAGES[locale];
  const title = m.meta[page].title.replace(/\s*\|\s*Groundwork$/, "").replace(/^Groundwork\s*\|\s*/, "");
  const desc = m.meta[page].description;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#faf7f2",
          color: "#1c1a17",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 28, height: 28, background: "#1f4d3a", borderRadius: 6 }} />
          <div style={{ fontSize: 34, fontWeight: 700, color: "#1f4d3a" }}>{SITE_NAME}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5 }}>{title}</div>
          <div style={{ fontSize: 28, color: "#5b564f", lineHeight: 1.35, maxWidth: 1000 }}>{desc}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 24, color: "#5b564f" }}>
          <div>{m.common.qualifier}</div>
          <div style={{ color: "#c2410c", fontWeight: 700 }}>{`${m.home.how.audit.title}: $3,000`}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
