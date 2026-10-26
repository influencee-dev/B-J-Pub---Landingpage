/**
 * Rate limit semplice in memoria (finestra fissa per IP).
 * LIMITE: funziona per un singolo processo. Su hosting serverless o con più istanze
 * ogni istanza ha il suo contatore, quindi la protezione è parziale: in produzione
 * sostituirlo con uno store condiviso (es. Redis/Upstash) o con il WAF dell'hosting.
 */

type Bucket = { count: number; resetAt: number };

export function createRateLimiter(limit: number, windowMs: number) {
  const buckets = new Map<string, Bucket>();

  return function hit(key: string, now = Date.now()): { allowed: boolean; retryAfterSec: number } {
    // Pulizia occasionale per non far crescere la mappa all'infinito.
    if (buckets.size > 5000) {
      for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
    }
    const b = buckets.get(key);
    if (!b || b.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, retryAfterSec: 0 };
    }
    b.count += 1;
    if (b.count > limit) return { allowed: false, retryAfterSec: Math.ceil((b.resetAt - now) / 1000) };
    return { allowed: true, retryAfterSec: 0 };
  };
}
