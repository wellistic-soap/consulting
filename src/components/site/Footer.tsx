import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { bookingHref, VERTICALS } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations("common");
  const locale = useLocale();
  const year = new Date().getFullYear();
  const linkClass = "block py-2.5 text-sm leading-6 text-foreground hover:text-primary";
  return (
    <footer className="border-t border-border">
      <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8 py-10">
        <div>
          <Logo height={24} />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{t("tagline")}</p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">{t("qualifier")}</p>
          <address className="mt-3 text-sm not-italic leading-6 text-muted-foreground">{t("footer.address")}</address>
        </div>
        <nav aria-label={t("nav.verticals")}>
          <p className="mono-label mb-3 font-semibold tracking-[0.18em]">{t("nav.verticals")}</p>
          {VERTICALS.map((v) => (
            <Link key={v.key} href={v.path} className={linkClass}>
              {t(`nav.${v.key}`)}
            </Link>
          ))}
        </nav>
        <nav aria-label="Secondary">
          <p className="mono-label mb-3 font-semibold tracking-[0.18em]">{t("siteName")}</p>
          <Link href="/pricing" className={linkClass}>{t("nav.pricing")}</Link>
          <a href={bookingHref({ locale })} target="_blank" rel="noopener" className={linkClass}>{t("cta.primary")}</a>
          <Link href="/privacy" className={linkClass}>{t("footer.privacy")}</Link>
          <Link href="/terms" className={linkClass}>{t("footer.terms")}</Link>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="container-site py-4 font-mono text-xs text-muted-foreground">
          &copy; {year} {t("siteName")}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
