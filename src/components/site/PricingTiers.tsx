import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { CtaLink } from "./CtaLink";

export async function PricingTiers({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "pricing" });
  const tiers = ["audit", "build", "retainer"] as const;

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {tiers.map((tier) => {
        const isAudit = tier === "audit";
        const includes = t.raw(`${tier}.includes`) as string[];
        return (
          <div
            key={tier}
            className={cn(
              "flex flex-col rounded-2xl border p-6 sm:p-8",
              isAudit
                ? "border-primary bg-card shadow-lg ring-2 ring-primary lg:-my-4 lg:py-12"
                : "border-border bg-card/60",
            )}
          >
            <span
              className={cn(
                "inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                isAudit ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              {isAudit ? t("audit.badge") : t(`${tier}.tag`)}
            </span>
            <h2 className={cn("mt-4 font-semibold", isAudit ? "text-3xl" : "text-2xl")}>{t(`${tier}.title`)}</h2>
            <p className={cn("mt-2 font-serif font-semibold text-primary", isAudit ? "text-4xl" : "text-2xl")}>
              {t(`${tier}.price`)}
            </p>
            {isAudit && <p className="mt-1 text-sm font-medium text-muted-foreground">{t("audit.duration")}</p>}
            <p className="mt-4 text-base text-muted-foreground">{t(`${tier}.desc`)}</p>
            <ul className="mt-5 space-y-2.5">
              {includes.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              {isAudit ? (
                <>
                  <CtaLink size="xl" className="w-full">{t("audit.cta")}</CtaLink>
                  <p className="mt-3 text-center text-sm font-medium text-primary">{t("audit.credit")}</p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">{t(`${tier}.note`)}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
