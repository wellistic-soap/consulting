import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { bookingHref, type VerticalKey } from "@/lib/site";

type Props = {
  children: React.ReactNode;
  vertical?: VerticalKey;
  size?: "default" | "lg" | "xl";
  variant?: "accent" | "outline" | "default";
  className?: string;
  arrow?: boolean;
};

/** Primary CTA: opens Cris's Calendly booking page. */
export function CtaLink({ children, vertical, size = "lg", variant = "accent", className, arrow = true }: Props) {
  const locale = useLocale();
  return (
    <a
      href={bookingHref({ vertical, locale })}
      target="_blank"
      rel="noopener"
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
      {arrow && <ArrowRight aria-hidden="true" />}
    </a>
  );
}
