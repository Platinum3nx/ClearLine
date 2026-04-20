import { z } from 'zod';

export const billingPlanSchema = z.object({
  code: z.string().min(2).max(80),
  name: z.string().min(2).max(120),
  amountCents: z.coerce.number().int().min(0),
  currency: z.string().length(3).default('USD'),
  interval: z.enum(['month', 'year']).default('month'),
  isCustom: z.boolean().default(false),
});

