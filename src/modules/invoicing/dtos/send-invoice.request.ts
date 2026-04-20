import { z } from 'zod';

export const sendInvoiceRequestSchema = z.object({
  channel: z.enum(['email', 'portal']).default('email'),
  recipients: z.array(z.string().email()).default([]),
  message: z.string().max(400).optional(),
});

