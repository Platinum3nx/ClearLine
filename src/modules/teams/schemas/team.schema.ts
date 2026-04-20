import { z } from 'zod';

export const teamSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2).max(160),
  slug: z.string().min(2).max(80),
  seatLimit: z.coerce.number().int().min(1).max(500).default(5),
  defaultCurrency: z.string().length(3).default('USD'),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

