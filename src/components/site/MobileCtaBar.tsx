import { CtaLink } from "./CtaLink";
import { ShareButton } from "./ShareButton";
import type { VerticalKey } from "@/lib/site";

/**
 * Fixed bottom bar on phones so the primary CTA is always in thumb reach.
 * Pages that render it should also render <MobileCtaSpacer /> at the end of main content.
 */
export function MobileCtaBar({
  label,
  vertical,
  shareTitle,
}: {
  label: string;
  vertical?: VerticalKey;
  shareTitle?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 md:hidden">
      <div className="container-site flex gap-2 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {shareTitle && <ShareButton title={shareTitle} size="lg" className="shrink-0 px-4" />}
        <CtaLink vertical={vertical} size="lg" className="flex-1">
          {label}
        </CtaLink>
      </div>
    </div>
  );
}

export function MobileCtaSpacer() {
  return <div aria-hidden="true" className="h-20 md:hidden" />;
}
