import type { Metadata } from "next";
import {
  BarChart3,
  CalendarCheck,
  ClipboardList,
  Database,
  FileCheck,
  MapPin,
  MessageSquareText,
  Package,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { VERTICALS } from "@/lib/site";
import { CtaLink } from "@/components/site/CtaLink";
import { MobileCtaBar, MobileCtaSpacer } from "@/components/site/MobileCtaBar";
import { Placeholder } from "@/components/site/Placeholder";
import { Section, SectionHeading } from "@/components/site/Section";
import { cn } from "@/lib/utils";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale as Locale, "home", "/");
}

const AUTOMATE_ICONS = [PhoneCall, MessageSquareText, CalendarCheck, Package, ClipboardList, BarChart3];
const TRUST_ICONS = [Database, MapPin, ShieldCheck, FileCheck];

export default async function HomePage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const c = await getTranslations({ locale, namespace: "common" });

  const automate = t.raw("automate.items") as { title: string; desc: string; metric: string }[];
  const trust = t.raw("trust.items") as { title: string; desc: string }[];

  return (
    <>
      {/* 1. Hero */}
      <Section className="pt-12 sm:pt-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-[1.1] sm:text-6xl">{t("hero.headline")}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">{t("hero.proof")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaLink size="xl">{t("hero.cta")}</CtaLink>
            <a href="#how" className="inline-flex h-13 items-center justify-center px-2 text-base font-medium text-primary underline-offset-4 hover:underline">
              {t("hero.secondary")}
            </a>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">{c("qualifier")}</p>
        </div>
      </Section>

      {/* 2. Who we work with */}
      <Section tone="muted">
        <SectionHeading title={t("verticals.title")} subtitle={t("verticals.subtitle")} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VERTICALS.map((v, i) => (
            <li key={v.key} className={cn(i === 0 && "sm:col-span-2 lg:col-span-1")}>
              <Link
                href={v.path}
                className={cn(
                  "group flex h-full flex-col rounded-xl border bg-card p-6 transition-colors hover:border-primary",
                  i === 0 ? "border-primary/40" : "border-border",
                )}
              >
                <h3 className="font-sans text-lg font-semibold tracking-normal group-hover:text-primary">
                  {t(`verticals.items.${v.key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(`verticals.items.${v.key}.desc`)}</p>
                <span className="mt-4 text-sm font-medium text-primary">{c("cta.learnMore")} &rarr;</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. What we automate */}
      <Section>
        <SectionHeading title={t("automate.title")} subtitle={t("automate.subtitle")} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {automate.map((item, i) => {
            const Icon = AUTOMATE_ICONS[i];
            return (
              <li key={item.title} className="flex flex-col rounded-xl border border-border bg-card p-6">
                <Icon className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-sans text-lg font-semibold tracking-normal">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                <p className="mt-4 border-t border-border pt-3 text-sm font-medium text-primary">{item.metric}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-sm text-muted-foreground">{c("typicalNote")}</p>
      </Section>

      {/* 4. How it works */}
      <Section id="how" tone="muted">
        <SectionHeading title={t("how.title")} subtitle={t("how.subtitle")} />
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="rounded-2xl border-2 border-primary bg-card p-7 shadow-lg sm:p-9">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("how.audit.step")}</span>
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                {t("how.audit.badge")}
              </span>
            </div>
            <h3 className="mt-4 text-3xl font-semibold">{t("how.audit.title")}</h3>
            <p className="mt-2 font-serif text-4xl font-semibold text-primary">
              {t("how.audit.price")} <span className="text-lg text-muted-foreground">/ {t("how.audit.duration")}</span>
            </p>
            <p className="mt-4 text-base leading-relaxed">{t("how.audit.desc")}</p>
            <p className="mt-3 text-sm font-medium text-primary">{t("how.audit.credit")}</p>
            <CtaLink size="xl" className="mt-6 w-full sm:w-auto">{t("how.audit.cta")}</CtaLink>
          </div>
          {(["build", "run"] as const).map((k) => (
            <div key={k} className="rounded-2xl border border-border bg-card/60 p-7">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t(`how.${k}.step`)}</span>
              <h3 className="mt-3 text-2xl font-semibold">{t(`how.${k}.title`)}</h3>
              <p className="mt-1 font-serif text-2xl font-semibold text-primary">{t(`how.${k}.price`)}</p>
              <span className="mt-3 inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {t(`how.${k}.tag`)}
              </span>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t(`how.${k}.desc`)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Who we are */}
      <Section>
        <SectionHeading title={t("who.title")} subtitle={t("who.subtitle")} />
        <div className="grid gap-6 sm:grid-cols-2">
          {(["oz", "cris"] as const).map((p) => (
            <div key={p} className="flex gap-5 rounded-xl border border-border bg-card p-6">
              {/* IMAGE SLOT: portrait photo for {p} */}
              <Placeholder slot={`portrait-${p}`} className="size-24 shrink-0 rounded-full sm:size-28" />
              <div>
                <h3 className="font-sans text-xl font-semibold tracking-normal">{t(`who.${p}.name`)}</h3>
                <p className="text-sm font-medium text-primary">{t(`who.${p}.role`)}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`who.${p}.bio`)}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. Trust */}
      <Section tone="primary">
        <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">{t("trust.title")}</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((item, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <li key={item.title}>
                <Icon className="size-6 text-primary-foreground/80" aria-hidden="true" />
                <h3 className="mt-3 font-sans text-lg font-semibold tracking-normal">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">{item.desc}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* 7. Pricing teaser */}
      <Section>
        <div className="grid items-center gap-6 rounded-2xl border border-border bg-card p-7 sm:p-10 md:grid-cols-[2fr_auto]">
          <div>
            <h2 className="text-3xl font-semibold">{t("pricingTeaser.title")}</h2>
            <p className="mt-3 text-base text-muted-foreground">{t("pricingTeaser.desc")}</p>
          </div>
          <Link
            href="/pricing"
            className="inline-flex h-12 items-center justify-center rounded-md border border-primary/30 px-6 text-base font-medium text-primary hover:bg-secondary"
          >
            {t("pricingTeaser.cta")}
          </Link>
        </div>
      </Section>

      {/* 8. Final CTA */}
      <Section tone="muted">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">{t("finalCta.title")}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{t("finalCta.desc")}</p>
          <div className="mt-8">
            <CtaLink size="xl">{t("finalCta.cta")}</CtaLink>
          </div>
        </div>
      </Section>

      <MobileCtaSpacer />
      <MobileCtaBar label={c("cta.primary")} />
    </>
  );
}
