import { describe, expect, it } from 'vitest';
import { buildIntegrationsRouter } from '../../../src/modules/integrations/integrations.routes.js';
import { adminMutationRateLimiter, integrationSyncRateLimiter, publicRateLimiter } from '../../../src/middleware/rateLimiter.js';

describe('buildIntegrationsRouter', () => {
  it('builds a router with generic and provider routes', () => {
    const controller = { list: () => undefined, connect: () => undefined, disconnect: () => undefined, testConnection: () => undefined, sync: () => undefined } as any;
    const router = buildIntegrationsRouter(controller, { slack: buildProviderRouter(), salesforce: buildProviderRouter(), quickbooks: buildProviderRouter() });

    expect(publicRateLimiter).toBeTypeOf('function');
    expect(adminMutationRateLimiter).toBeTypeOf('function');
    expect(integrationSyncRateLimiter).toBeTypeOf('function');
    expect((router as any).stack.length).toBeGreaterThan(4);
  });
});

import { Router } from 'express';

function buildProviderRouter() {
  return Router();
}
