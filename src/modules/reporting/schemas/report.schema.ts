import { z } from 'zod';

export const reportSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2).max(160),
  slug: z.string().min(2).max(80),
  format: z.enum(['csv', 'pdf']).default('csv'),
  status: z.enum(['draft', 'ready', 'archived']).default('draft'),
});
