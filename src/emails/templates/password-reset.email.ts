import type { EmailPayloadMap, EmailTemplateResult } from '../types.js';

export function passwordResetEmail(payload: EmailPayloadMap['password-reset']): EmailTemplateResult {
  return {
    title: 'Password reset',
    subject: 'Reset your Clearline password',
    html: '<p>Hi ' + payload.recipientName + ', reset your password here: ' + payload.resetLink + '</p>',
    text: 'Hi ' + payload.recipientName + ', reset your password here: ' + payload.resetLink,
  };
}
