import { z } from 'zod';

export const confirmPaymentRequestSchema = z.object({
  providerReference: z.string().min(6).optional(),
});

