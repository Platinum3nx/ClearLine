import type { EmailPayloadMap, EmailTemplateResult } from '../types.js';

export function invoiceSentEmail(payload: EmailPayloadMap['invoice-sent']): EmailTemplateResult {
  return {
    title: 'Invoice sent',
    subject: 'Invoice ' + payload.invoiceNumber + ' is ready',
    html: '<p>Hi ' + payload.recipientName + ', invoice ' + payload.invoiceNumber + ' was sent.</p>',
    text: 'Hi ' + payload.recipientName + ', invoice ' + payload.invoiceNumber + ' was sent.',
  };
}
