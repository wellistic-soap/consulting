/** Brand mark: a 14px primary square. Swap for the real logo when available. */
export function Logo({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`inline-block size-3.5 rounded-sm bg-primary ${className}`} />;
}
