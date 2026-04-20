import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { buildTestApp } from '../helpers/app.factory.js';

describe('analytics-ingest-flow', () => {
  it('returns 401 for unauthenticated access', async () => {
    const app = buildTestApp();
    const response = await request(app).post('/v2/analytics/events').send({ eventName: 'invoice.sent', source: 'api', properties: {} });

    expect(response.status).toBe(401);
  });
});

