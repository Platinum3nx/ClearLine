import { z } from 'zod';

export const pushInvoiceRequestSchema = z.object({
  invoiceId: z.string().min(8),
  customerName: z.string().min(2).max(160),
  totalCents: z.coerce.number().int().min(1),
});
