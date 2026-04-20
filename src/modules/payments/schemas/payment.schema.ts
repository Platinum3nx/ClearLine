import { z } from 'zod';

export const paymentSchema = z.object({
  invoiceId: z.string().min(8),
  amountCents: z.coerce.number().int().min(1),
  currency: z.string().length(3).default('USD'),
});

