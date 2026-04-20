import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { buildTestApp } from '../helpers/app.factory.js';

describe('payments routes', () => {
  it('requires authentication for payment intents', async () => {
    const app = buildTestApp();
    const response = await request(app).post('/v1/payments/intents').send({ amountCents: 1000 });

    expect(response.status).toBe(401);
  });
});

