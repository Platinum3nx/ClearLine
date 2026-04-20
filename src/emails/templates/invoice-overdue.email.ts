import type { EmailPayloadMap, EmailTemplateResult } from '../types.js';

export function invoiceOverdueEmail(payload: EmailPayloadMap['invoice-overdue']): EmailTemplateResult {
  return {
    title: 'Invoice overdue',
    subject: 'Invoice ' + payload.invoiceNumber + ' is overdue',
    html: '<p>Hi ' + payload.recipientName + ', invoice ' + payload.invoiceNumber + ' is overdue.</p>',
    text: 'Hi ' + payload.recipientName + ', invoice ' + payload.invoiceNumber + ' is overdue.',
  };
}
