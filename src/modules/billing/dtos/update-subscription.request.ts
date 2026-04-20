import { z } from 'zod';

export const updateSubscriptionRequestSchema = z.object({
  planCode: z.string().min(2),
  seats: z.coerce.number().int().min(1).max(1000),
  status: z.enum(['trialing', 'active', 'past_due', 'canceled']).default('active'),
});

