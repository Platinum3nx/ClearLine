import { env } from './env.js';

export const httpConfig = {
  port: env.PORT,
  allowedOrigins: env.ALLOWED_ORIGINS.split(',').map((entry) => entry.trim()),
  requestTimeoutMs: 15000,
};

