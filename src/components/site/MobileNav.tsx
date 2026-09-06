"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { bookingHref, VERTICALS } from "@/lib/site";

/**
 * Hamburger lives in the header; the sheet is portaled to <body> because the
 * header's backdrop-filter would otherwise become the containing block for a fixed child.
 */
export function MobileNav() {
  const t = useTranslations("common");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const sheet = open ? (
    <nav
      id="mobile-nav"
      aria-label="Main"
      className="fixed inset-x-0 top-14 bottom-0 z-50 overflow-y-auto border-t border-border bg-background lg:hidden"
    >
      <div className="container-site flex flex-col pt-4 pb-8">
        <p className="mono-label px-2 pt-2 pb-1 font-semibold tracking-[0.18em]">{t("nav.verticals")}</p>
        {VERTICALS.map((v) => (
          <Link key={v.key} href={v.path} className="rounded-md px-2 py-3 text-lg font-medium text-foreground hover:bg-secondary">
            {t(`nav.${v.key}`)}
          </Link>
        ))}
        <div className="my-3 h-px bg-border" />
        <Link href="/pricing" className="rounded-md px-2 py-3 text-lg font-medium hover:bg-secondary">
          {t("nav.pricing")}
        </Link>
        <a
          href={bookingHref({ locale })}
          target="_blank"
          rel="noopener"
          onClick={() => setOpen(false)}
          className="mt-4 inline-flex h-13 items-center justify-center rounded-lg bg-accent px-6 text-base font-semibold text-accent-foreground hover:bg-accent-hover"
        >
          {t("cta.primary")}
        </a>
      </div>
    </nav>
  ) : null;

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? t("nav.close") : t("nav.menu")}
        className="inline-flex size-11 items-center justify-center rounded-md text-primary hover:bg-secondary"
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {mounted && sheet && createPortal(sheet, document.body)}
    </div>
  );
}
