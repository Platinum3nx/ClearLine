import { z } from 'zod';

export const finalizeInvoiceRequestSchema = z.object({
  finalizeReason: z.string().max(240).optional(),
  requestedBy: z.string().max(120).optional(),
});

