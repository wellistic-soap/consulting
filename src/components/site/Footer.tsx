import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { bookingHref, VERTICALS } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations("common");
  const locale = useLocale();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container-site py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 font-serif text-xl font-semibold text-primary">
              <Logo />
              {t("siteName")}
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">{t("tagline")}</p>
            <p className="mt-4 text-sm font-medium text-foreground">{t("qualifier")}</p>
          </div>
          <nav aria-label={t("nav.verticals")}>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("nav.verticals")}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {VERTICALS.map((v) => (
                <li key={v.key}>
                  <Link href={v.path} className="hover:text-primary">
                    {t(`nav.${v.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Secondary">
            <ul className="space-y-2 text-sm md:mt-7">
              <li>
                <Link href="/pricing" className="hover:text-primary">{t("nav.pricing")}</Link>
              </li>
              <li>
                <a href={bookingHref({ locale })} target="_blank" rel="noopener" className="hover:text-primary">{t("nav.callback")}</a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary">{t("footer.privacy")}</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">{t("footer.terms")}</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>
            &copy; {year} {t("siteName")}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
