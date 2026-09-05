import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { PAGE_PATHS } from "@/lib/site";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routing.locales.flatMap((locale) =>
    PAGE_PATHS.map((path) => ({
      url: absoluteUrl(locale, path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path === "/callback" || path === "/pricing" ? 0.9 : path.startsWith("/priv") || path.startsWith("/terms") ? 0.2 : 0.8,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
