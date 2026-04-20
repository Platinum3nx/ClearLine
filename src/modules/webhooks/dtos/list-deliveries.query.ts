import { z } from 'zod';

export const listDeliveriesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
  endpointId: z.string().optional(),
  status: z.enum(['queued', 'delivered', 'failed']).optional(),
});
