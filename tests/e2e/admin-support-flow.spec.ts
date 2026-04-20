import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { buildTestApp } from '../helpers/app.factory.js';

describe('admin-support-flow', () => {
  it('returns 401 for unauthenticated access', async () => {
    const app = buildTestApp();
    const response = await request(app).get('/admin/accounts');

    expect(response.status).toBe(401);
  });
});

