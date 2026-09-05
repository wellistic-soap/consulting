"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/i18n/navigation";
import {
  BEST_TIME_OPTIONS,
  LANGUAGE_OPTIONS,
  LOCATION_OPTIONS,
  REVENUE_OPTIONS,
  VERTICAL_OPTIONS,
} from "@/lib/callback-options";
import { cn } from "@/lib/utils";

const selectClass =
  "h-12 w-full rounded-md border border-input bg-card px-3 text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive";
const inputClass = "h-12 bg-card text-base";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function Form() {
  const t = useTranslations("callback");
  const locale = useLocale();
  const params = useSearchParams();
  const initialVertical = params.get("vertical") ?? "";
  const validVertical = (VERTICAL_OPTIONS as readonly string[]).includes(initialVertical) ? initialVertical : "";

  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error" | "rate">("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;

    // Client-side required checks (server validates again with zod)
    const errs: Record<string, string> = {};
    if (!data.name || data.name.trim().length < 2) errs.name = t("errors.name");
    if (!data.business || data.business.trim().length < 2) errs.business = t("errors.business");
    for (const k of ["vertical", "locations", "revenue", "language", "bestTime"]) {
      if (!data[k]) errs[k] = t("errors.required");
    }
    if (!data.phone || data.phone.replace(/\D/g, "").length < 10) errs.phone = t("errors.phone");
    setFieldErrors(errs);
    if (Object.keys(errs).length) {
      const first = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (res.status === 429) {
        setStatus("rate");
        return;
      }
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        if (json.fields?.length) {
          const fe: Record<string, string> = {};
          for (const f of json.fields as string[]) fe[f] = f === "phone" ? t("errors.phone") : t("errors.required");
          setFieldErrors(fe);
        }
        setStatus("error");
        return;
      }
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-primary/20 bg-card p-6 sm:p-8" role="status" aria-live="polite">
        <CheckCircle2 className="size-10 text-primary" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-semibold">{t("success.title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("success.desc")}</p>
        <Link href="/" className="mt-6 inline-flex text-sm font-medium text-primary underline underline-offset-4">
          {t("success.home")}
        </Link>
      </div>
    );
  }

  const inv = (k: string) => (fieldErrors[k] ? true : undefined);
  const desc = (k: string) => (fieldErrors[k] ? `${k}-error` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot: hidden from humans, bots tend to fill it */}
      <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field id="name" label={t("fields.name")} error={fieldErrors.name}>
        <Input id="name" name="name" autoComplete="name" required className={inputClass} aria-invalid={inv("name")} aria-describedby={desc("name")} />
      </Field>

      <Field id="business" label={t("fields.business")} error={fieldErrors.business}>
        <Input id="business" name="business" autoComplete="organization" required className={inputClass} aria-invalid={inv("business")} aria-describedby={desc("business")} />
      </Field>

      <Field id="vertical" label={t("fields.vertical")} error={fieldErrors.vertical}>
        <select id="vertical" name="vertical" required defaultValue={validVertical} className={selectClass} aria-invalid={inv("vertical")} aria-describedby={desc("vertical")}>
          <option value="" disabled>{t("fields.select")}</option>
          {VERTICAL_OPTIONS.map((v) => (
            <option key={v} value={v}>{t(`options.vertical.${v}`)}</option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="locations" label={t("fields.locations")} error={fieldErrors.locations}>
          <select id="locations" name="locations" required defaultValue="" className={selectClass} aria-invalid={inv("locations")} aria-describedby={desc("locations")}>
            <option value="" disabled>{t("fields.select")}</option>
            {LOCATION_OPTIONS.map((v) => (
              <option key={v} value={v}>{t(`options.locations.${v}`)}</option>
            ))}
          </select>
        </Field>
        <Field id="revenue" label={t("fields.revenue")} error={fieldErrors.revenue}>
          <select id="revenue" name="revenue" required defaultValue="" className={selectClass} aria-invalid={inv("revenue")} aria-describedby={desc("revenue")}>
            <option value="" disabled>{t("fields.select")}</option>
            {REVENUE_OPTIONS.map((v) => (
              <option key={v} value={v}>{t(`options.revenue.${v}`)}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="phone" label={t("fields.phone")} error={fieldErrors.phone}>
        <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={inputClass} aria-invalid={inv("phone")} aria-describedby={desc("phone")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="language" label={t("fields.language")} error={fieldErrors.language}>
          <select id="language" name="language" required defaultValue={locale} className={selectClass} aria-invalid={inv("language")} aria-describedby={desc("language")}>
            {LANGUAGE_OPTIONS.map((v) => (
              <option key={v} value={v}>{t(`options.language.${v}`)}</option>
            ))}
          </select>
        </Field>
        <Field id="bestTime" label={t("fields.bestTime")} error={fieldErrors.bestTime}>
          <select id="bestTime" name="bestTime" required defaultValue="" className={selectClass} aria-invalid={inv("bestTime")} aria-describedby={desc("bestTime")}>
            <option value="" disabled>{t("fields.select")}</option>
            {BEST_TIME_OPTIONS.map((v) => (
              <option key={v} value={v}>{t(`options.bestTime.${v}`)}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label={t("fields.message")}>
        <Textarea id="message" name="message" rows={3} maxLength={2000} placeholder={t("fields.messagePlaceholder")} className="bg-card text-base" />
      </Field>

      {(status === "error" || status === "rate") && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive" role="alert">
          {status === "rate" ? t("errors.rateLimited") : t("errors.generic")}
        </p>
      )}

      <Button type="submit" variant="accent" size="xl" disabled={status === "sending"} className={cn("w-full", status === "sending" && "opacity-70")}>
        {status === "sending" ? t("sending") : t("submit")}
      </Button>
      <p className="text-xs text-muted-foreground">{t("privacyNote")}</p>
    </form>
  );
}

export function CallbackForm() {
  return (
    <Suspense fallback={<div className="h-[600px]" />}>
      <Form />
    </Suspense>
  );
}
