import { describe, expect, it } from 'vitest';
import { buildSlackRouter } from '../../../src/modules/integrations/slack/slack.routes.js';
import { integrationSyncRateLimiter, publicRateLimiter } from '../../../src/middleware/rateLimiter.js';

describe('buildSlackRouter', () => {
  it('wires controller handlers into a router', () => {
    const controller = new Proxy({}, { get: () => (_req: unknown, _res: unknown) => undefined }) as any;
    const router = buildSlackRouter(controller);

    expect(publicRateLimiter).toBeTypeOf('function');
    expect(integrationSyncRateLimiter).toBeTypeOf('function');
    expect((router as any).stack.length).toBeGreaterThan(0);
  });
});
