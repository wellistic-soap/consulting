import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { CallbackForm } from "@/components/site/CallbackForm";
import { Section } from "@/components/site/Section";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale as Locale, "callback", "/callback");
}

export default async function CallbackPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "callback" });
  const c = await getTranslations({ locale, namespace: "common" });

  return (
    <Section className="pt-10 sm:pt-16">
      <div className="mx-auto max-w-xl">
        <h1 className="text-4xl font-semibold">{t("title")}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{t("intro")}</p>
        <p className="mt-2 text-sm text-muted-foreground">{c("qualifier")}</p>
        <div className="relative mt-8">
          <CallbackForm />
        </div>
      </div>
    </Section>
  );
}
