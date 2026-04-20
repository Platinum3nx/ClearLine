import { describe, expect, it } from 'vitest';
import { buildV2Router } from '../../../src/routes/v2.js';
import { publicRateLimiter } from '../../../src/middleware/rateLimiter.js';

describe('buildV2Router', () => {
  it('builds a router with registered routes', () => {
    const router = buildV2Router();
    expect(publicRateLimiter).toBeTypeOf('function');
    expect((router as any).stack.length).toBeGreaterThan(0);
  });
});
