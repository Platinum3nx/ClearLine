import { describe, expect, it } from 'vitest';
import { buildAdminModuleRouter } from '../../../src/modules/admin/admin.routes.js';
import { adminMutationRateLimiter, publicRateLimiter } from '../../../src/middleware/rateLimiter.js';

describe('buildAdminModuleRouter', () => {
  it('wires controller handlers into a router', () => {
    const controller = new Proxy({}, { get: () => (_req: unknown, _res: unknown) => undefined }) as any;
    const router = buildAdminModuleRouter(controller);

    expect(publicRateLimiter).toBeTypeOf('function');
    expect(adminMutationRateLimiter).toBeTypeOf('function');
    expect((router as any).stack.length).toBeGreaterThan(0);
  });
});
