import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { CtaLink } from "@/components/site/CtaLink";
import { MobileCtaBar, MobileCtaSpacer } from "@/components/site/MobileCtaBar";
import { PricingTiers } from "@/components/site/PricingTiers";
import { Section, SectionHeading } from "@/components/site/Section";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale as Locale, "pricing", "/pricing");
}

export default async function PricingPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pricing" });
  const c = await getTranslations({ locale, namespace: "common" });
  const faq = t.raw("faq.items") as { q: string; a: string }[];

  return (
    <>
      <Section className="pt-10 sm:pt-16">
        <SectionHeading title={t("title")} subtitle={t("intro")} className="mb-10" />
        <PricingTiers locale={locale as Locale} />
        <p className="mt-8 text-center text-sm font-medium text-muted-foreground">{c("qualifier")}</p>
      </Section>

      <Section tone="muted">
        <SectionHeading title={t("faq.title")} />
        <div className="max-w-3xl divide-y divide-border rounded-xl border border-border bg-card">
          {faq.map((item) => (
            <details key={item.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 text-base font-semibold [&::-webkit-details-marker]:hidden">
                {item.q}
                <span aria-hidden="true" className="text-xl text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pt-2 pb-1 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">{t("cta.title")}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{t("cta.desc")}</p>
          <div className="mt-8">
            <CtaLink size="xl">{c("cta.primary")}</CtaLink>
          </div>
        </div>
      </Section>

      <MobileCtaSpacer />
      <MobileCtaBar label={c("cta.primary")} />
    </>
  );
}
