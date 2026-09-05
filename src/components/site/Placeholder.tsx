import { cn } from "@/lib/utils";

/**
 * IMAGE SLOT. Neutral abstract block used until real imagery is supplied.
 * Replace by swapping this component for <Image /> at the call site.
 * Each usage carries a data-image-slot attribute so slots are easy to grep.
 */
export function Placeholder({
  slot,
  className,
  label,
}: {
  slot: string;
  className?: string;
  label?: string;
}) {
  return (
    <div
      data-image-slot={slot}
      aria-hidden="true"
      className={cn("relative overflow-hidden rounded-xl bg-secondary", className)}
    >
      <div className="absolute inset-x-6 top-6 h-2/5 rounded-lg bg-primary/15" />
      <div className="absolute bottom-6 left-6 h-1/4 w-1/3 rounded-lg bg-primary/25" />
      <div className="absolute right-6 bottom-6 h-1/4 w-2/5 rounded-lg bg-accent/25" />
      {label && (
        <span className="absolute bottom-2 right-3 font-mono text-[10px] uppercase tracking-wider text-primary/50">
          {label}
        </span>
      )}
    </div>
  );
}
