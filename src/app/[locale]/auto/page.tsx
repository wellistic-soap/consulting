import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { VerticalPage } from "@/components/site/VerticalPage";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale as Locale, "auto", "/auto");
}

export default async function Page({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <VerticalPage locale={locale as Locale} vertical="auto" />;
}
