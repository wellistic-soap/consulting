import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { VERTICALS } from "@/lib/site";
import { LanguageToggle } from "./LanguageToggle";
import { MobileNav } from "./MobileNav";
import { Logo } from "./Logo";

export function Header() {
  const t = useTranslations("common");
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="container-site flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-semibold text-primary" aria-label={t("siteName")}>
          <Logo />
          {t("siteName")}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium md:flex">
          {VERTICALS.map((v) => (
            <Link key={v.key} href={v.path} className="text-foreground/80 hover:text-primary">
              {t(`nav.${v.key}`)}
            </Link>
          ))}
          <Link href="/pricing" className="text-foreground/80 hover:text-primary">
            {t("nav.pricing")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Link
            href="/callback"
            className="hidden h-10 items-center rounded-md bg-accent px-4 text-sm font-semibold text-accent-foreground hover:bg-accent-hover md:inline-flex"
          >
            {t("nav.callback")}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
