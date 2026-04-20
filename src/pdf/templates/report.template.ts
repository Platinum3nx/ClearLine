import { applyPdfBranding } from '../policies/pdf-brand.policy.js';
import type { PdfDocumentDefinition } from '../pdf.types.js';

export function buildReportDocument(input: { reportName: string; summary: string }): PdfDocumentDefinition {
  return {
    fileName: input.reportName.replace(/\s+/g, '-').toLowerCase() + '.pdf',
    html: applyPdfBranding('<h1>' + input.reportName + '</h1><p>' + input.summary + '</p>'),
  };
}
