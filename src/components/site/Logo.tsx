/** Simple mark: two stacked blocks. Swap for the real logo file when available. */
export function Logo({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <rect x="3" y="13" width="18" height="8" rx="1.5" />
      <rect x="6" y="3" width="12" height="8" rx="1.5" opacity="0.55" />
    </svg>
  );
}
