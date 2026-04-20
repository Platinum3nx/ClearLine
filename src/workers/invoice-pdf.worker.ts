import { PdfService } from '../pdf/pdf.service.js';
import { buildInvoiceDocument } from '../pdf/templates/invoice.template.js';
import { HtmlToBufferRenderer } from '../pdf/renderers/html-to-buffer.renderer.js';

export async function runInvoicePdfWorker() {
  const pdfService = new PdfService(new HtmlToBufferRenderer());
  await pdfService.renderDocument(buildInvoiceDocument({
    invoiceNumber: 'INV-10027',
    customerName: 'Northwind Operations',
    totalCents: 194850,
  }));
}
