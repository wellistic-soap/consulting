import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { VerticalKey } from "@/lib/site";

type Props = {
  children: React.ReactNode;
  vertical?: VerticalKey;
  size?: "default" | "lg" | "xl";
  variant?: "accent" | "outline" | "default";
  className?: string;
  arrow?: boolean;
};

export function CtaLink({ children, vertical, size = "lg", variant = "accent", className, arrow = true }: Props) {
  const href = vertical ? { pathname: "/callback", query: { vertical } } : "/callback";
  return (
    <Link href={href} className={cn(buttonVariants({ variant, size }), className)}>
      {children}
      {arrow && <ArrowRight aria-hidden="true" />}
    </Link>
  );
}
