import { describe, expect, it } from 'vitest';
import { buildReportingRouter } from '../../../src/modules/reporting/reporting.routes.js';
import { adminMutationRateLimiter, publicRateLimiter, reportRunRateLimiter } from '../../../src/middleware/rateLimiter.js';

describe('buildReportingRouter', () => {
  it('wires controller handlers into a router', () => {
    const controller = new Proxy({}, { get: () => (_req: unknown, _res: unknown) => undefined }) as any;
    const router = buildReportingRouter(controller);

    expect(publicRateLimiter).toBeTypeOf('function');
    expect(adminMutationRateLimiter).toBeTypeOf('function');
    expect(reportRunRateLimiter).toBeTypeOf('function');
    expect((router as any).stack.length).toBeGreaterThan(0);
  });
});
