import type { EmailPayloadMap, EmailTemplateResult } from '../types.js';

export function integrationConnectedEmail(payload: EmailPayloadMap['integration-connected']): EmailTemplateResult {
  return {
    title: 'Integration connected',
    subject: payload.provider + ' integration connected',
    html: '<p>Hi ' + payload.recipientName + ', your ' + payload.provider + ' integration is connected.</p>',
    text: 'Hi ' + payload.recipientName + ', your ' + payload.provider + ' integration is connected.',
  };
}
