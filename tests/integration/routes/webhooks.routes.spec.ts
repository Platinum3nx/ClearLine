import { describe, expect, it } from 'vitest';
import { buildWebhooksRouter } from '../../../src/modules/webhooks/webhooks.routes.js';
import { adminMutationRateLimiter, publicRateLimiter, webhookInboundRateLimiter } from '../../../src/middleware/rateLimiter.js';

describe('buildWebhooksRouter', () => {
  it('wires controller handlers into a router', () => {
    const controller = new Proxy({}, { get: () => (_req: unknown, _res: unknown) => undefined }) as any;
    const router = buildWebhooksRouter(controller);

    expect(publicRateLimiter).toBeTypeOf('function');
    expect(adminMutationRateLimiter).toBeTypeOf('function');
    expect(webhookInboundRateLimiter).toBeTypeOf('function');
    expect((router as any).stack.length).toBeGreaterThan(0);
  });
});
