import { applyPdfBranding } from '../policies/pdf-brand.policy.js';
import type { PdfDocumentDefinition } from '../pdf.types.js';

export function buildPayoutSummaryDocument(input: { batchId: string; amountCents: number }): PdfDocumentDefinition {
  return {
    fileName: 'payout-' + input.batchId + '.pdf',
    html: applyPdfBranding('<h1>Payout ' + input.batchId + '</h1><p>Total: ' + input.amountCents + '</p>'),
  };
}
