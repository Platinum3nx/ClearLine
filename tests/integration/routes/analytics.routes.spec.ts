import { describe, expect, it } from 'vitest';
import { buildAnalyticsRouter } from '../../../src/modules/analytics/analytics.routes.js';
import { analyticsIngestRateLimiter, publicRateLimiter, reportRunRateLimiter } from '../../../src/middleware/rateLimiter.js';

describe('buildAnalyticsRouter', () => {
  it('wires controller handlers into a router', () => {
    const controller = new Proxy({}, { get: () => (_req: unknown, _res: unknown) => undefined }) as any;
    const router = buildAnalyticsRouter(controller);

    expect(publicRateLimiter).toBeTypeOf('function');
    expect(reportRunRateLimiter).toBeTypeOf('function');
    expect(analyticsIngestRateLimiter).toBeTypeOf('function');
    expect((router as any).stack.length).toBeGreaterThan(0);
  });
});
