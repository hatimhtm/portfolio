import { LRUCache } from "lru-cache";

type RateLimitRecord = {
  count: number;
  expiry: number;
};

const cache = new LRUCache<string, RateLimitRecord>({
  max: 500,
  ttl: 60000 * 2, // Safety margin
});

export async function rateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 60000
): Promise<boolean> {
  const now = Date.now();
  let record = cache.get(ip);

  if (!record || now > record.expiry) {
    record = { count: 0, expiry: now + windowMs };
  }

  if (record.count >= limit) {
    return false; // Rate limit exceeded
  }

  record.count += 1;
  cache.set(ip, record);
  return true; // Allowed
}
