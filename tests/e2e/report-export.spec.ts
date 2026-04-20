import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { buildTestApp } from '../helpers/app.factory.js';

describe('report-export', () => {
  it('returns 401 for unauthenticated access', async () => {
    const app = buildTestApp();
    const response = await request(app).get('/v2/reporting');

    expect(response.status).toBe(401);
  });
});

