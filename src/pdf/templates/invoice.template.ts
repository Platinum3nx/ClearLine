import { applyPdfBranding } from '../policies/pdf-brand.policy.js';
import type { PdfDocumentDefinition } from '../pdf.types.js';

export function buildInvoiceDocument(input: { invoiceNumber: string; customerName: string; totalCents: number }): PdfDocumentDefinition {
  const html = applyPdfBranding('<h1>' + input.invoiceNumber + '</h1><p>' + input.customerName + '</p><p>Total: ' + input.totalCents + '</p>');

  return {
    fileName: input.invoiceNumber + '.pdf',
    html,
  };
}
