import type { RateLimitRequestHandler, Store } from 'express-rate-limit';
import { ipKeyGenerator, rateLimit } from 'express-rate-limit';

interface ApiThrottleOptions {
  limit?: number;
  windowMs?: number;
}

class SlidingWindowMemoryStore implements Store {
  localKeys = true;
  prefix = 'clearline:v2:';
  private hits = new Map<string, number[]>();
  private interval?: ReturnType<typeof setInterval>;
  private windowMs = 60_000;

  init(options: { windowMs: number }) {
    this.windowMs = options.windowMs;

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      this.pruneAll();
    }, this.windowMs);
    this.interval.unref();
  }

  increment(key: string) {
    const timestamps = this.activeHitsFor(key);
    const now = Date.now();

    timestamps.push(now);
    this.hits.set(key, timestamps);

    return {
      totalHits: timestamps.length,
      resetTime: new Date(timestamps[0] + this.windowMs),
    };
  }

  decrement(key: string) {
    const timestamps = this.activeHitsFor(key);

    timestamps.pop();

    if (timestamps.length === 0) {
      this.hits.delete(key);
      return;
    }

    this.hits.set(key, timestamps);
  }

  resetKey(key: string) {
    this.hits.delete(key);
  }

  resetAll() {
    this.hits.clear();
  }

  shutdown() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }

    this.hits.clear();
  }

  private activeHitsFor(key: string) {
    const now = Date.now();
    const timestamps = this.hits.get(key) ?? [];
    const activeHits = timestamps.filter((timestamp) => now - timestamp < this.windowMs);

    if (activeHits.length === 0) {
      this.hits.delete(key);
    }

    return activeHits;
  }

  private pruneAll() {
    for (const key of this.hits.keys()) {
      this.activeHitsFor(key);
    }
  }
}

export function createApiThrottle(options: ApiThrottleOptions = {}): RateLimitRequestHandler {
  return rateLimit({
    windowMs: options.windowMs ?? 60_000,
    limit: options.limit ?? 120,
    legacyHeaders: false,
    standardHeaders: 'draft-7',
    store: new SlidingWindowMemoryStore(),
    keyGenerator: (request) => ipKeyGenerator(request.ip || request.socket.remoteAddress || '127.0.0.1'),
    message: {
      code: 'too_many_requests',
      message: 'Too many requests, please try again later.',
    },
  });
}

export const apiThrottle = createApiThrottle();
