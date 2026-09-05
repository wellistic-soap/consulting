/**
 * Simple in-memory sliding window rate limiter keyed by IP.
 * Per-instance on serverless (good enough to blunt abuse of a low-volume lead form).
 * Swap for Upstash or Vercel KV if the site ever gets real traffic.
 */
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_HITS = 5;

const hits = new Map<string, number[]>();

export function rateLimit(key: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(key, recent);
    return { ok: false, remaining: 0 };
  }
  recent.push(now);
  hits.set(key, recent);
  // Opportunistic cleanup
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return { ok: true, remaining: MAX_HITS - recent.length };
}
