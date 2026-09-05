import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { CtaLink } from "./CtaLink";

export async function PricingTiers({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "pricing" });
  const includes = (tier: string) => t.raw(`${tier}.includes`) as string[];

  return (
    <div className="space-y-12">
      {/* Audit (dominant) and Build */}
      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <div className="flex flex-col rounded-2xl border border-primary bg-card p-6 shadow-lg ring-2 ring-primary sm:p-9">
          <span className="inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            {t("audit.badge")}
          </span>
          <h2 className="mt-4 text-3xl font-semibold">{t("audit.title")}</h2>
          <p className="mt-2 font-serif text-5xl font-semibold text-primary">{t("audit.price")}</p>
          <p className="mt-1 text-sm font-medium text-muted-foreground">{t("audit.duration")}</p>
          <p className="mt-4 text-base text-muted-foreground">{t("audit.desc")}</p>
          <ul className="mt-5 space-y-2.5">
            {includes("audit").map((item) => (
              <li key={item} className="flex gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-6">
            <p className="mb-4 rounded-lg bg-secondary px-4 py-3 text-center text-base font-semibold text-primary">
              {t("audit.credit")}
            </p>
            <CtaLink size="xl" className="w-full">{t("audit.cta")}</CtaLink>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-border bg-card/60 p-6 sm:p-8">
          <span className="inline-flex w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("build.tag")}
          </span>
          <h2 className="mt-4 text-2xl font-semibold">{t("build.title")}</h2>
          <p className="mt-2 font-serif text-2xl font-semibold text-primary">{t("build.price")}</p>
          <p className="mt-4 text-base text-muted-foreground">{t("build.desc")}</p>
          <ul className="mt-5 space-y-2.5">
            {includes("build").map((item) => (
              <li key={item} className="flex gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-auto pt-6 text-sm text-muted-foreground">{t("build.note")}</p>
        </div>
      </div>

      {/* Retainer: two scoped tiers */}
      <div>
        <h2 className="text-2xl font-semibold sm:text-3xl">{t("retainerTitle")}</h2>
        <p className="mt-2 text-base text-muted-foreground">{t("retainerIntro")}</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {(["monitor", "improve"] as const).map((tier) => (
            <div key={tier} className={cn("flex flex-col rounded-2xl border border-border bg-card/60 p-6 sm:p-8")}>
              <span className="inline-flex w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t(`${tier}.tag`)}
              </span>
              <h3 className="mt-4 text-2xl font-semibold">{t(`${tier}.title`)}</h3>
              <p className="mt-2 font-serif text-2xl font-semibold text-primary">{t(`${tier}.price`)}</p>
              <p className="mt-3 text-base font-medium">{t(`${tier}.framing`)}</p>
              <ul className="mt-4 space-y-2.5">
                {includes(tier).map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-6 text-sm text-muted-foreground">{t(`${tier}.note`)}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-base font-medium text-primary">{t("retainerNote")}</p>
      </div>
    </div>
  );
}
