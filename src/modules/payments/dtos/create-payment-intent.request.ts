import { paymentSchema } from '../schemas/payment.schema.js';

export const createPaymentIntentRequestSchema = paymentSchema.pick({
  invoiceId: true,
  amountCents: true,
  currency: true,
});

