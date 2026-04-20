import type { PaymentRecord } from '../payments.types.js';

export function presentPayment(payment: PaymentRecord) {
  return {
    id: payment.id,
    invoiceId: payment.invoiceId,
    status: payment.status,
    provider: payment.provider,
    providerReference: payment.providerReference,
    amountCents: payment.amountCents,
    currency: payment.currency,
  };
}

