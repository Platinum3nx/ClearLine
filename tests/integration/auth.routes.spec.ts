import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { buildTestApp } from '../helpers/app.factory.js';

describe('auth routes', () => {
  it('returns 400 for invalid login payloads', async () => {
    const app = buildTestApp();
    const response = await request(app).post('/v1/auth/login').send({ email: 'bad' });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('validation_error');
  });
});

