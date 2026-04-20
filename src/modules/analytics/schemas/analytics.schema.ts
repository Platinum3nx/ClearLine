import { z } from 'zod';

export const analyticsEventSchema = z.object({
  eventName: z.string().min(2).max(120),
  source: z.enum(['api', 'dashboard', 'worker']).default('api'),
  properties: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({}),
});
