"use client";

import { Suspense } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

function Toggle({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("common.langToggle");
  const other = locale === "en" ? "es" : "en";
  const query = Object.fromEntries(searchParams.entries());

  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      href={{ pathname: pathname as any, query }}
      locale={other}
      hrefLang={other}
      lang={other}
      aria-label={t("aria")}
      className={cn(
        "inline-flex h-11 items-center rounded-md border border-primary/30 px-3 text-sm font-medium text-primary transition-colors hover:bg-secondary",
        className,
      )}
    >
      {t("label")}
    </Link>
  );
}

export function LanguageToggle({ className }: { className?: string }) {
  return (
    <Suspense fallback={<span className={cn("inline-block h-11 w-20", className)} />}>
      <Toggle className={className} />
    </Suspense>
  );
}
