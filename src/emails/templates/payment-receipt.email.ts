import type { EmailPayloadMap, EmailTemplateResult } from '../types.js';

export function paymentReceiptEmail(payload: EmailPayloadMap['payment-receipt']): EmailTemplateResult {
  return {
    title: 'Payment receipt',
    subject: 'Payment receipt for ' + payload.amount,
    html: '<p>Hi ' + payload.recipientName + ', we received your payment of ' + payload.amount + '.</p>',
    text: 'Hi ' + payload.recipientName + ', we received your payment of ' + payload.amount + '.',
  };
}
