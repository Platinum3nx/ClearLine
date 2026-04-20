import { z } from 'zod';

export const syncAccountRequestSchema = z.object({
  externalAccountId: z.string().min(2),
  accountName: z.string().min(2).max(160),
});
