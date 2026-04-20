import { Redis } from 'ioredis';
import { env } from './env.js';
import { logger } from './logger.js';

export const redis = new Redis(env.REDIS_URL, {
  lazyConnect: true,
  enableReadyCheck: false,
  maxRetriesPerRequest: 1,
});

redis.on('error', (error: unknown) => {
  logger.warn({ error }, 'redis client reported an error');
});

export async function ensureRedis() {
  if (redis.status === 'wait') {
    try {
      await redis.connect();
    } catch (error) {
      logger.warn({ error }, 'redis connection failed during lazy connect');
    }
  }

  return redis;
}
