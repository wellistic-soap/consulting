import type { Metadata } from "next";
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

const num = (i: number) => String(i + 1).padStart(2, "0");

export default async function HomePage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const c = await getTranslations({ locale, namespace: "common" });

  const stats = t.raw("stats") as { value: string; label: string }[];
  const automate = t.raw("automate.items") as { title: string; desc: string; metric: string }[];
  const trust = t.raw("trust.items") as { title: string; desc: string }[];

  return (
    <>
      {/* Hero */}
      <section className="grid-bg pt-[clamp(56px,10vw,136px)] pb-[clamp(40px,6vw,80px)]">
        <div className="container-site">
          <p className="eyebrow mb-5">{t("hero.eyebrow")}</p>
          <h1 className="max-w-[920px] text-[clamp(38px,5.6vw,72px)] font-semibold leading-none tracking-[-0.035em]">
            {t("hero.headline")}
          </h1>
          <p className="mt-6 max-w-[600px] text-[clamp(17px,1.4vw,20px)] leading-normal text-pretty text-muted-foreground">
            {t("hero.proof")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <CtaLink size="xl">{t("hero.cta")}</CtaLink>
            <a href="#how" className="inline-flex min-h-11 items-center gap-1.5 text-base font-medium text-primary hover:underline">
              {t("hero.secondary")} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          {/* Metric strip */}
          <div className="mt-[clamp(40px,5vw,64px)] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] overflow-hidden rounded-xl bg-card shadow-card">
            {stats.map((s) => (
              <div key={s.value} className="-mr-px -mb-px border-r border-b border-muted px-7 py-6">
                <p className="mono-label">{c("typical")}</p>
                <p className="mt-1.5 font-mono text-[clamp(26px,2.4vw,32px)] font-semibold tracking-tight text-primary">{s.value}</p>
                <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-xs text-muted-foreground">{c("qualifier")}</p>
        </div>
      </section>

      {/* 01 Who we work with */}
      <Section tone="muted">
        <SectionHeading eyebrow="01" title={t("verticals.title")} subtitle={t("verticals.subtitle")} />
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(168px,1fr))] gap-4">
          {VERTICALS.map((v, i) => (
            <li key={v.key}>
              <Link
                href={v.path}
                className={cn(
                  "card card-lift flex min-h-[200px] flex-col border p-5 text-foreground",
                  i === 0 ? "border-primary/60" : "border-transparent",
                )}
              >
                <span className="eyebrow">{num(i)}</span>
                <h3 className="mt-3.5 text-lg font-semibold leading-tight tracking-tight">{t(`verticals.items.${v.key}.title`)}</h3>
                <p className="mt-2 flex-1 text-sm leading-normal text-muted-foreground">{t(`verticals.items.${v.key}.desc`)}</p>
                <span className="mt-4 text-sm font-medium text-primary">{c("cta.learnMore")} &rarr;</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 02 What we take off your plate */}
      <Section>
        <SectionHeading eyebrow="02" title={t("automate.title")} subtitle={t("automate.subtitle")} />
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {automate.map((item, i) => (
            <li key={item.title} className="card card-lift flex flex-col p-7">
              <span className="eyebrow">{num(i)}</span>
              <h3 className="mt-3.5 text-[19px] font-semibold leading-tight tracking-tight">{item.title}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-[1.55] text-pretty text-muted-foreground">{item.desc}</p>
              <div className="mt-5 flex items-baseline gap-2.5 border-t border-border pt-3">
                <span className="mono-label flex-none">{c("typical")}</span>
                <span className="font-mono text-sm font-semibold leading-snug text-primary">{item.metric}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-2xl text-sm text-muted-foreground">{c("typicalNote")}</p>
      </Section>

      {/* 03 How it works */}
      <Section id="how" tone="muted">
        <SectionHeading eyebrow="03" title={t("how.title")} subtitle={t("how.subtitle")} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-5">
          <div className="shadow-audit flex flex-col rounded-xl border border-primary bg-card p-[clamp(22px,3vw,36px)]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">{t("how.audit.step")}</span>
              <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-accent-foreground">
                {t("how.audit.badge")}
              </span>
            </div>
            <h3 className="mt-4 text-[clamp(24px,2.4vw,30px)] font-semibold leading-[1.1] tracking-[-0.025em]">{t("how.audit.title")}</h3>
            <div className="mt-2 flex flex-wrap items-baseline gap-3">
              <p className="font-mono text-[clamp(40px,4vw,48px)] font-semibold leading-none tracking-tight text-primary">{t("how.audit.price")}</p>
              <p className="font-mono text-sm whitespace-nowrap text-muted-foreground">/ {t("how.audit.duration")}</p>
            </div>
            <p className="mt-5 text-base leading-[1.55] text-pretty text-muted-foreground">{t("how.audit.desc")}</p>
            <p className="mt-6 rounded-md bg-secondary px-4 py-3 text-center text-[15px] font-semibold leading-snug text-primary">
              {t("how.audit.credit")}
            </p>
            <CtaLink size="xl" className="mt-3 w-full">{t("how.audit.cta")}</CtaLink>
          </div>

          <div className="flex flex-col gap-3">
            {(["build", "run"] as const).map((k) => (
              <div key={k} className="card bg-card/70 p-7">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{t(`how.${k}.step`)}</p>
                <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-[22px] font-semibold tracking-[-0.025em]">{t(`how.${k}.title`)}</h3>
                  <p className="font-mono text-lg font-semibold text-primary">{t(`how.${k}.price`)}</p>
                </div>
                <p className="mono-label mt-2">{t(`how.${k}.tag`)}</p>
                <p className="mt-3 text-[15px] leading-[1.55] text-pretty text-muted-foreground">{t(`how.${k}.desc`)}</p>
              </div>
            ))}
            <p className="px-1 text-sm text-muted-foreground">{t("how.noRetainer")}</p>
          </div>
        </div>
      </Section>

      {/* 04 Who we are */}
      <Section>
        <SectionHeading eyebrow="04" title={t("who.title")} subtitle={t("who.subtitle")} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {(["oz", "cris"] as const).map((p) => (
            <div key={p} className="card flex flex-wrap gap-5 p-7">
              {/* IMAGE SLOT: portrait photo */}
              <Placeholder slot={`portrait-${p}`} label={`photo / ${p}`} className="h-[140px] w-28 shrink-0" />
              <div className="min-w-0 flex-1 basis-[200px]">
                <h3 className="text-xl font-semibold tracking-tight">{t(`who.${p}.name`)}</h3>
                <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.08em] text-primary">{t(`who.${p}.role`)}</p>
                <p className="mt-3 text-[15px] leading-[1.55] text-pretty text-muted-foreground">{t(`who.${p}.bio`)}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 05 Trust band */}
      <Section tone="primary">
        <p className="eyebrow mb-3 text-white/85">05</p>
        <h2 className="max-w-2xl text-[clamp(32px,3.6vw,48px)] font-semibold leading-[1.06] tracking-[-0.03em]">{t("trust.title")}</h2>
        <ul className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-8">
          {trust.map((item, i) => (
            <li key={item.title} className="border-t border-white/25 pt-4">
              <p className="font-mono text-[11px] tracking-[0.18em] text-white/70">{num(i)}</p>
              <h3 className="mt-2.5 text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.55] text-pretty text-white/80">{item.desc}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Pricing teaser */}
      <section className="pt-[clamp(72px,9vw,128px)]">
        <div className="container-site">
          <div className="card flex flex-wrap items-center justify-between gap-x-10 gap-y-5 rounded-xl p-[clamp(24px,3vw,40px)]">
            <div className="min-w-0 flex-[1_1_420px]">
              <h2 className="text-[clamp(24px,2.4vw,30px)] font-semibold leading-[1.15] tracking-[-0.025em]">{t("pricingTeaser.title")}</h2>
              <p className="mt-2.5 text-base leading-[1.55] text-pretty text-muted-foreground">{t("pricingTeaser.desc")}</p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-md border border-primary/30 px-6 text-base font-medium text-primary transition-colors hover:bg-secondary"
            >
              {t("pricingTeaser.cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="book" className="py-[clamp(64px,8vw,112px)]">
        <div className="container-site flex flex-col items-center text-center">
          <h2 className="max-w-[720px] text-[clamp(30px,3.4vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em]">{t("finalCta.title")}</h2>
          <p className="mt-4 max-w-[520px] text-[17px] leading-normal text-pretty text-muted-foreground">{t("finalCta.desc")}</p>
          <div className="card mt-9 flex w-full max-w-[420px] flex-col gap-4 rounded-xl p-7 text-left">
            <div className="flex items-center gap-3.5">
              {/* IMAGE SLOT: small portrait of Cris */}
              <Placeholder slot="portrait-cris-small" label="cris" className="size-14 shrink-0" />
              <div>
                <p className="text-base font-semibold tracking-tight">{t("finalCta.talkTo")}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{t("finalCta.talkToSub")}</p>
              </div>
            </div>
            <CtaLink size="xl" className="w-full">{t("finalCta.cta")}</CtaLink>
            <p className="font-mono text-xs text-muted-foreground">{t("finalCta.talkToMeta")}</p>
          </div>
        </div>
      </section>

      <MobileCtaSpacer />
      <MobileCtaBar label={c("cta.primary")} />
    </>
  );
}
