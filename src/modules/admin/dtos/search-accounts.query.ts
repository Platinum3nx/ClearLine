import { z } from 'zod';

export const searchAccountsQuerySchema = z.object({
  query: z.string().optional(),
  status: z.enum(['active', 'past_due', 'churned']).optional(),
});
