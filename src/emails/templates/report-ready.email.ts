import type { EmailPayloadMap, EmailTemplateResult } from '../types.js';

export function reportReadyEmail(payload: EmailPayloadMap['report-ready']): EmailTemplateResult {
  return {
    title: 'Report ready',
    subject: payload.reportName + ' is ready',
    html: '<p>Hi ' + payload.recipientName + ', your report ' + payload.reportName + ' is ready.</p>',
    text: 'Hi ' + payload.recipientName + ', your report ' + payload.reportName + ' is ready.',
  };
}
