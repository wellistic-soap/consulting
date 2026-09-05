import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/site/Section";
import { CtaLink } from "@/components/site/CtaLink";

export default function NotFound() {
  const t = useTranslations("notFound");
  const c = useTranslations("common");
  return (
    <Section className="py-24">
      <div className="max-w-xl">
        <h1 className="text-4xl font-semibold">{t("title")}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{t("desc")}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink>{c("cta.primary")}</CtaLink>
          <Link href="/" className="inline-flex h-11 items-center justify-center rounded-md border border-primary/30 px-6 text-base font-medium text-primary hover:bg-secondary">
            {t("home")}
          </Link>
        </div>
      </div>
    </Section>
  );
}
