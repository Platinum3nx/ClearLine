import { z } from 'zod';

export const invoiceSchema = z.object({
  currency: z.string().length(3).default('USD'),
  subtotalCents: z.coerce.number().int().min(0),
  taxCents: z.coerce.number().int().min(0).default(0),
  totalCents: z.coerce.number().int().min(0),
  dueDate: z.string().datetime(),
});

