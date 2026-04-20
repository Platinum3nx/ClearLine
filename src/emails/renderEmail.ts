import { baseHtmlLayout, baseTextLayout } from './layouts/base.layout.js';
import { integrationConnectedEmail } from './templates/integration-connected.email.js';
import { invoiceOverdueEmail } from './templates/invoice-overdue.email.js';
import { invoiceSentEmail } from './templates/invoice-sent.email.js';
import { passwordResetEmail } from './templates/password-reset.email.js';
import { paymentReceiptEmail } from './templates/payment-receipt.email.js';
import { reportReadyEmail } from './templates/report-ready.email.js';
import { teamInviteEmail } from './templates/team-invite.email.js';
import { webhookFailedEmail } from './templates/webhook-failed.email.js';
import type { EmailPayloadMap, EmailTemplateName, RenderedEmail } from './types.js';

export function renderEmail<TTemplate extends EmailTemplateName>(template: TTemplate, payload: EmailPayloadMap[TTemplate]): RenderedEmail {
  const message = (() => {
    switch (template) {
      case 'invoice-sent':
        return invoiceSentEmail(payload as EmailPayloadMap['invoice-sent']);
      case 'invoice-overdue':
        return invoiceOverdueEmail(payload as EmailPayloadMap['invoice-overdue']);
      case 'payment-receipt':
        return paymentReceiptEmail(payload as EmailPayloadMap['payment-receipt']);
      case 'team-invite':
        return teamInviteEmail(payload as EmailPayloadMap['team-invite']);
      case 'password-reset':
        return passwordResetEmail(payload as EmailPayloadMap['password-reset']);
      case 'report-ready':
        return reportReadyEmail(payload as EmailPayloadMap['report-ready']);
      case 'webhook-failed':
        return webhookFailedEmail(payload as EmailPayloadMap['webhook-failed']);
      case 'integration-connected':
      default:
        return integrationConnectedEmail(payload as EmailPayloadMap['integration-connected']);
    }
  })();

  return {
    subject: message.subject,
    html: baseHtmlLayout(message.title, message.html),
    text: baseTextLayout(message.title, message.text),
  };
}
