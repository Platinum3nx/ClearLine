import { describe, expect, it } from 'vitest';
import { buildSalesforceRouter } from '../../../src/modules/integrations/salesforce/salesforce.routes.js';
import { integrationSyncRateLimiter, publicRateLimiter } from '../../../src/middleware/rateLimiter.js';

describe('buildSalesforceRouter', () => {
  it('wires controller handlers into a router', () => {
    const controller = new Proxy({}, { get: () => (_req: unknown, _res: unknown) => undefined }) as any;
    const router = buildSalesforceRouter(controller);

    expect(publicRateLimiter).toBeTypeOf('function');
    expect(integrationSyncRateLimiter).toBeTypeOf('function');
    expect((router as any).stack.length).toBeGreaterThan(0);
  });
});
