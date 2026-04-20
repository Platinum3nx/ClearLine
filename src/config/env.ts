import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  APP_NAME: z.string().default('clearline-api'),
  JWT_ISSUER: z.string().default('clearline'),
  JWT_AUDIENCE: z.string().default('clearline-dashboard'),
  JWT_SECRET: z.string().default('local-demo-secret'),
  REDIS_URL: z.string().default('redis://127.0.0.1:6379'),
  DATABASE_URL: z.string().default('postgresql://clearline:clearline@127.0.0.1:5432/clearline'),
  DEFAULT_CURRENCY: z.string().default('USD'),
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000,http://localhost:5173'),
});

export const env = envSchema.parse(process.env);

