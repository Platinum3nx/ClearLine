import { z } from 'zod';

export const inviteUserRequestSchema = z.object({
  email: z.string().email(),
  role: z.enum(['owner', 'admin', 'member']).default('member'),
  message: z.string().max(240).optional(),
});

