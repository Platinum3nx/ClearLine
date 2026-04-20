import { z } from 'zod';

export const resetPasswordRequestSchema = z.object({
  resetToken: z.string().uuid(),
  newPassword: z.string().min(12).max(128),
});

