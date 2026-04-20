import type { EmailPayloadMap, EmailTemplateResult } from '../types.js';

export function teamInviteEmail(payload: EmailPayloadMap['team-invite']): EmailTemplateResult {
  return {
    title: 'Team invite',
    subject: 'You were invited to ' + payload.teamName,
    html: '<p>Hi ' + payload.recipientName + ', you were invited to join ' + payload.teamName + '.</p>',
    text: 'Hi ' + payload.recipientName + ', you were invited to join ' + payload.teamName + '.',
  };
}
