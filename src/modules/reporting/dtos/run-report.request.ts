import { z } from 'zod';

export const runReportRequestSchema = z.object({
  format: z.enum(['csv', 'pdf']).default('csv'),
  includeDrafts: z.boolean().default(false),
});
