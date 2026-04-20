import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApiThrottle } from '../../../src/middleware/apiThrottle.js';

describe('createApiThrottle', () => {
  it('blocks requests after the configured limit is exceeded', async () => {
    const app = express();

    app.use(createApiThrottle({ limit: 2, windowMs: 60_000 }));
    app.get('/v2/health', (_req, res) => {
      res.json({ ok: true });
    });

    await request(app).get('/v2/health').expect(200);
    await request(app).get('/v2/health').expect(200);

    const response = await request(app).get('/v2/health').expect(429);

    expect(response.body).toEqual({
      code: 'too_many_requests',
      message: 'Too many requests, please try again later.',
    });
  });
});
