import { z } from 'zod';

export const impersonateUserRequestSchema = z.object({
  targetUserId: z.string().min(8),
  reason: z.string().min(8).max(240),
});
