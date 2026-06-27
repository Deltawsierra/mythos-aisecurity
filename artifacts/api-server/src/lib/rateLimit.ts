/**
 * Minimal in-memory, per-IP sliding-window rate limiter.
 *
 * Good enough to blunt casual abuse of the public inquiry endpoint. NOTE: state
 * is per-process, so it does not coordinate across multiple autoscale instances
 * — a shared store (e.g. Redis) would be required for strict global limits.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

const hitsByIp = new Map<string, number[]>();
let lastSweep = Date.now();

function sweep(now: number, windowMs: number): void {
  if (now - lastSweep < windowMs) return;
  lastSweep = now;
  for (const [ip, hits] of hitsByIp) {
    const fresh = hits.filter((t) => now - t < windowMs);
    if (fresh.length === 0) hitsByIp.delete(ip);
    else hitsByIp.set(ip, fresh);
  }
}

export interface RateLimitResult {
  ok: boolean;
  retryAfterMs: number;
}

export function rateLimit(
  ip: string,
  max: number = MAX_HITS,
  windowMs: number = WINDOW_MS,
): RateLimitResult {
  const now = Date.now();
  sweep(now, windowMs);

  const recent = (hitsByIp.get(ip) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= max) {
    hitsByIp.set(ip, recent);
    const retryAfterMs = windowMs - (now - recent[0]);
    return { ok: false, retryAfterMs };
  }

  recent.push(now);
  hitsByIp.set(ip, recent);
  return { ok: true, retryAfterMs: 0 };
}
