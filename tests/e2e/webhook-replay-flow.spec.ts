import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { buildTestApp } from '../helpers/app.factory.js';

describe('webhook-replay-flow', () => {
  it('returns 401 for unauthenticated access', async () => {
    const app = buildTestApp();
    const response = await request(app).get('/v1/webhooks/deliveries');

    expect(response.status).toBe(401);
  });
});

