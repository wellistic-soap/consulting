import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { bookingHref, VERTICALS } from "@/lib/site";
import { LanguageToggle } from "./LanguageToggle";
import { MobileNav } from "./MobileNav";
import { Logo } from "./Logo";

export function Header() {
  const t = useTranslations("common");
  const locale = useLocale();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/92 backdrop-blur supports-[backdrop-filter]:bg-background/92">
      <div className="container-site flex h-14 items-center justify-between gap-4">
        <Link href="/" className="flex items-center" aria-label={t("siteName")}>
          <Logo height={26} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {VERTICALS.map((v) => (
            <Link key={v.key} href={v.path} className="rounded-md px-2.5 py-2 text-sm font-medium text-foreground hover:bg-secondary">
              {t(`navShort.${v.key}`)}
            </Link>
          ))}
          <Link href="/pricing" className="rounded-md px-2.5 py-2 text-sm font-medium text-foreground hover:bg-secondary">
            {t("navShort.pricing")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <a
            href={bookingHref({ locale })}
            target="_blank"
            rel="noopener"
            className="hidden h-11 items-center rounded-md bg-accent px-4 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover md:inline-flex"
          >
            {t("nav.callback")}
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
