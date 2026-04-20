import { describe, expect, it } from 'vitest';
import { buildQuickBooksRouter } from '../../../src/modules/integrations/quickbooks/quickbooks.routes.js';
import { integrationSyncRateLimiter, publicRateLimiter } from '../../../src/middleware/rateLimiter.js';

describe('buildQuickBooksRouter', () => {
  it('wires controller handlers into a router', () => {
    const controller = new Proxy({}, { get: () => (_req: unknown, _res: unknown) => undefined }) as any;
    const router = buildQuickBooksRouter(controller);

    expect(publicRateLimiter).toBeTypeOf('function');
    expect(integrationSyncRateLimiter).toBeTypeOf('function');
    expect((router as any).stack.length).toBeGreaterThan(0);
  });
});
