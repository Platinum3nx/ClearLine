import { z } from 'zod';

export const addMemberRequestSchema = z.object({
  userId: z.string().min(8),
  title: z.string().max(120).optional(),
});

