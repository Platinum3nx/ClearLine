import crypto from 'node:crypto';
import type { Request, RequestHandler } from 'express';
import { logger } from '../config/logger.js';
import { ensureRedis } from '../config/redis.js';
import { AppError } from '../lib/errors.js';

interface RateLimiterOptions {
  key: string;
  max: number;
  windowSeconds: number;
  skip?: (req: Request) => boolean;
}

async function consumeRateLimit(bucket: string, windowSeconds: number) {
  const redis = await ensureRedis();
  const windowKey = bucket + ':' + Math.floor(Date.now() / (windowSeconds * 1000));
  const result = await redis.multi().incr(windowKey).expire(windowKey, windowSeconds).ttl(windowKey).exec();
  const hits = Number(result?.[0]?.[1] ?? 0);
  const resetInSeconds = Number(result?.[2]?.[1] ?? windowSeconds);

  return { hits, resetInSeconds };
}

function subjectForRequest(req: Request) {
  if (req.user?.id) {
    return req.user.id;
  }

  if (req.tenantId) {
    return req.tenantId;
  }

  return crypto.createHash('sha1').update(req.ip || 'unknown').digest('hex');
}

export function createRateLimiter(options: RateLimiterOptions): RequestHandler {
  return async (req, res, next) => {
    if (options.skip?.(req)) {
      next();
      return;
    }

    try {
      const bucket = 'clearline:rate:' + options.key + ':' + subjectForRequest(req);
      const result = await consumeRateLimit(bucket, options.windowSeconds);

      res.setHeader('x-ratelimit-limit', String(options.max));
      res.setHeader('x-ratelimit-remaining', String(Math.max(options.max - result.hits, 0)));
      res.setHeader('x-ratelimit-reset', String(result.resetInSeconds));

      if (result.hits > options.max) {
        next(new AppError(429, 'too_many_requests', 'Rate limit exceeded'));
        return;
      }

      next();
    } catch (error) {
      logger.warn({ error, key: options.key }, 'rate limiter degraded open');
      next();
    }
  };
}

export const publicRateLimiter = createRateLimiter({ key: 'public', max: 120, windowSeconds: 60 });
export const authBurstRateLimiter = createRateLimiter({ key: 'auth-burst', max: 8, windowSeconds: 60 });
export const adminMutationRateLimiter = createRateLimiter({ key: 'admin-mutation', max: 30, windowSeconds: 60 });
export const invoiceMutationRateLimiter = createRateLimiter({ key: 'invoice-mutation', max: 40, windowSeconds: 60 });
export const paymentMutationRateLimiter = createRateLimiter({ key: 'payment-mutation', max: 25, windowSeconds: 60 });

