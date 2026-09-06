import { cn } from "@/lib/utils";

/**
 * IMAGE SLOT. Neutral block used until real imagery is supplied.
 * Replace by swapping this component for <Image /> at the call site.
 * Each usage carries a data-image-slot attribute so slots are easy to grep.
 */
export function Placeholder({ slot, className, label }: { slot: string; className?: string; label?: string }) {
  return (
    <div
      data-image-slot={slot}
      title={label ? `Image slot: ${label}` : undefined}
      aria-hidden="true"
      className={cn("relative overflow-hidden rounded-md bg-secondary", className)}
    >
      <div className="absolute inset-x-3.5 top-3.5 h-2/5 rounded bg-primary/15" />
      <div className="absolute bottom-3.5 left-3.5 h-[22%] w-2/5 rounded bg-primary/25" />
    </div>
  );
}
