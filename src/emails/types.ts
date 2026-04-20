export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

export type EmailTemplateName =
  | 'invoice-sent'
  | 'invoice-overdue'
  | 'payment-receipt'
  | 'team-invite'
  | 'password-reset'
  | 'report-ready'
  | 'webhook-failed'
  | 'integration-connected';

export interface EmailPayloadMap {
  'invoice-sent': { recipientName: string; invoiceNumber: string };
  'invoice-overdue': { recipientName: string; invoiceNumber: string };
  'payment-receipt': { recipientName: string; amount: string };
  'team-invite': { recipientName: string; teamName: string };
  'password-reset': { recipientName: string; resetLink: string };
  'report-ready': { recipientName: string; reportName: string };
  'webhook-failed': { recipientName: string; endpointUrl: string };
  'integration-connected': { recipientName: string; provider: string };
}

export interface EmailTemplateResult {
  title: string;
  subject: string;
  html: string;
  text: string;
}
