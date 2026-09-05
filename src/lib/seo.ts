import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_NAME, SITE_URL } from "./site";

export function localizedPath(locale: Locale, path: string) {
  const clean = path === "/" ? "" : path;
  return locale === routing.defaultLocale ? clean || "/" : `/${locale}${clean}`;
}

export function absoluteUrl(locale: Locale, path: string) {
  return `${SITE_URL}${localizedPath(locale, path)}`;
}

export function languageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = absoluteUrl(l, path);
  languages["x-default"] = absoluteUrl(routing.defaultLocale, path);
  return languages;
}

type MetaKey =
  | "home"
  | "dealers"
  | "homeServices"
  | "dental"
  | "auto"
  | "gyms"
  | "pricing"
  | "privacy"
  | "terms";

export async function buildMetadata(
  locale: Locale,
  key: MetaKey,
  path: string,
  opts: { noindex?: boolean } = {},
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t(`${key}.title`);
  const description = t(`${key}.description`);
  const ogUrl = `${SITE_URL}/api/og?locale=${locale}&page=${key}`;
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: absoluteUrl(locale, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(locale, path),
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_US" : "en_US",
      type: "website",
      images: [{ url: ogUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogUrl] },
    robots: opts.noindex ? { index: false, follow: false } : undefined,
  };
}
