"use client";

import { useEffect, useState } from "react";
import { Check, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { title: string; className?: string; size?: "default" | "lg" | "xl" };

export function ShareButton({ title, className, size = "lg" }: Props) {
  const t = useTranslations("common.share");
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  async function share() {
    const url = window.location.href;
    if (canShare) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user cancelled or share failed; fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", url);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size={size}
      onClick={share}
      aria-label={t("aria")}
      aria-live="polite"
      className={cn("bg-background", className)}
    >
      {copied ? <Check aria-hidden="true" /> : <Share2 aria-hidden="true" />}
      {copied ? t("copied") : t("button")}
    </Button>
  );
}
