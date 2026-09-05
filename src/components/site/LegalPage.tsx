import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Section } from "./Section";

export async function LegalPage({ locale, kind }: { locale: Locale; kind: "privacy" | "terms" }) {
  const t = await getTranslations({ locale, namespace: `legal.${kind}` });
  const sections = t.raw("sections") as { h: string; p: string }[];
  return (
    <Section className="pt-10 sm:pt-16">
      <div className="prose-legal max-w-2xl">
        <h1 className="text-4xl font-semibold">{t("title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("updated")}</p>
        {sections.map((s) => (
          <div key={s.h}>
            <h2>{s.h}</h2>
            <p>{s.p}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
