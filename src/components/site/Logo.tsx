import Image from "next/image";
import { SITE_NAME } from "@/lib/site";

/**
 * Hecho AI wordmark. Source PNG is 1637 x 422 (dark on transparent);
 * exported to public/brand at 126 px tall (served unoptimized so it stays crisp at 3x on phones).
 */
export function Logo({ height = 28, className = "" }: { height?: number; className?: string }) {
  const width = Math.round(height * (1637 / 422));
  return (
    <Image
      src="/brand/hecho-logo@3x.png"
      alt={SITE_NAME}
      width={width}
      height={height}
      priority
      unoptimized
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
