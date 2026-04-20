import { z } from 'zod';

export const queryMetricsRequestSchema = z.object({
  metricKeys: z.array(z.string()).min(1),
  range: z.enum(['7d', '30d', '90d']).default('30d'),
});
