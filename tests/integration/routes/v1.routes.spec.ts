import { describe, expect, it } from 'vitest';
import { buildV1Router } from '../../../src/routes/v1.js';
import { publicRateLimiter } from '../../../src/middleware/rateLimiter.js';

describe('buildV1Router', () => {
  it('builds a router with registered routes', () => {
    const router = buildV1Router();
    expect(publicRateLimiter).toBeTypeOf('function');
    expect((router as any).stack.length).toBeGreaterThan(0);
  });
});
