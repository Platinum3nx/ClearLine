import { z } from 'zod';

export const requestPasswordResetRequestSchema = z.object({
  email: z.string().email(),
});

