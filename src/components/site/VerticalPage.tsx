import { Check, CircleAlert } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { HERO_IMAGES, type VerticalKey } from "@/lib/site";
import { Placeholder } from "./Placeholder";
import { CtaLink } from "./CtaLink";
import { MobileCtaBar, MobileCtaSpacer } from "./MobileCtaBar";
import Image from "next/image";
import { Section, SectionHeading } from "./Section";
import { ShareButton } from "./ShareButton";

type Workflow = { title: string; desc: string };

export async function VerticalPage({ locale, vertical }: { locale: Locale; vertical: VerticalKey }) {
  const t = await getTranslations({ locale, namespace: vertical });
  const v = await getTranslations({ locale, namespace: "vertical" });
  const c = await getTranslations({ locale, namespace: "common" });
  const m = await getTranslations({ locale, namespace: "meta" });

  const pains = t.raw("pains") as string[];
  const workflows = t.raw("workflows") as Workflow[];
  const trust = t.raw("trust") as string[];
  const useCases = t.raw("useCases") as { title: string; problem: string; build: string; roi: string }[];
  const shareTitle = m(`${vertical}.title`);

  return (
    <>
      {/* Hero */}
      <Section className="pt-10 sm:pt-16">
        <div className="grid items-center gap-8 md:grid-cols-[3fr_2fr] md:gap-12">
          <div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{t("hero.headline")}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{t("hero.sub")}</p>
            <p className="mt-4 text-base">{v("auditPitch")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink vertical={vertical} size="xl">{v("ctaButton")}</CtaLink>
              <ShareButton title={shareTitle} size="xl" className="hidden md:inline-flex" />
            </div>
          </div>
          {HERO_IMAGES.has(vertical) ? (
            <Image
              src={`/images/heroes/${vertical}.webp`}
              alt={t("hero.imageAlt")}
              width={1200}
              height={900}
              sizes="(min-width: 1152px) 440px, (min-width: 768px) 40vw, 0px"
              className="card hidden aspect-[4/3] w-full object-cover md:block"
            />
          ) : (
            <Placeholder slot={`${vertical}-hero`} label="hero" className="hidden aspect-[4/3] md:block" />
          )}
        </div>
      </Section>

      {/* Pains */}
      <Section tone="muted">
        <SectionHeading eyebrow="01" title={v("painsTitle")} />
        <ul className="grid gap-4 sm:grid-cols-2">
          {pains.map((p) => (
            <li key={p} className="flex gap-3 card p-5">
              <CircleAlert className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <p className="text-base leading-relaxed">{p}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Workflows */}
      <Section>
        <SectionHeading eyebrow="02" title={v("workflowsTitle")} />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workflows.map((w, i) => (
            <li key={w.title} className="card p-6">
              <span className="font-mono text-xs font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-sans text-lg font-semibold tracking-tight">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Trust */}
      <Section tone="primary" className="py-12 sm:py-16">
        <h2 className="text-[clamp(28px,3vw,40px)] font-semibold leading-[1.06] tracking-[-0.03em]">{v("trustTitle")}</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {trust.map((item) => (
            <li key={item} className="flex gap-3">
              <Check className="mt-1 size-5 shrink-0 text-white/80" aria-hidden="true" />
              <p className="text-base text-white/90">{item}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Use cases, ranked by payback */}
      <Section>
        <SectionHeading eyebrow="03" title={v("useCasesTitle")} subtitle={v("useCasesSubtitle")} />
        <ol className="grid gap-5 md:grid-cols-2">
          {useCases.map((u, i) => (
            <li key={u.title} className="flex flex-col card p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-sans text-xl font-semibold tracking-tight">{u.title}</h3>
              </div>
              <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                <div>
                  <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground">{v("problemLabel")}</dt>
                  <dd className="mt-1">{u.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground">{v("buildLabel")}</dt>
                  <dd className="mt-1">{u.build}</dd>
                </div>
              </dl>
              <div className="mt-auto border-t border-border pt-3">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground">{v("roiLabel")}</p>
                <p className="mt-0.5 font-mono text-[15px] font-semibold leading-snug text-primary">{u.roi}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted-foreground">{v("useCasesNote")}</p>
      </Section>

      {/* CTA */}
      <Section tone="muted">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">{t("cta.title")}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{t("cta.desc")}</p>
          <p className="mt-2 text-sm text-muted-foreground">{c("qualifier")}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaLink vertical={vertical} size="xl">{v("ctaButton")}</CtaLink>
            <ShareButton title={shareTitle} size="xl" />
          </div>
        </div>
      </Section>

      <MobileCtaSpacer />
      <MobileCtaBar label={v("ctaButton")} vertical={vertical} shareTitle={shareTitle} />
    </>
  );
}
