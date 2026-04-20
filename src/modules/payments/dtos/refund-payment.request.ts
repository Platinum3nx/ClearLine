import { z } from 'zod';

export const refundPaymentRequestSchema = z.object({
  amountCents: z.coerce.number().int().min(1),
  providerReference: z.string().min(6).optional(),
  reason: z.string().max(180).optional(),
});

