import type { EmailPayloadMap, EmailTemplateResult } from '../types.js';

export function webhookFailedEmail(payload: EmailPayloadMap['webhook-failed']): EmailTemplateResult {
  return {
    title: 'Webhook delivery failed',
    subject: 'Webhook delivery needs attention',
    html: '<p>Hi ' + payload.recipientName + ', the endpoint ' + payload.endpointUrl + ' is failing deliveries.</p>',
    text: 'Hi ' + payload.recipientName + ', the endpoint ' + payload.endpointUrl + ' is failing deliveries.',
  };
}
