import { PdfService } from '../../../pdf/pdf.service.js';
import { HtmlToBufferRenderer } from '../../../pdf/renderers/html-to-buffer.renderer.js';
import { buildInvoiceDocument } from '../../../pdf/templates/invoice.template.js';
import type { InvoiceRecord } from '../invoicing.types.js';

export class InvoicePdfRenderer {
  async render(invoice: InvoiceRecord) {
    const service = new PdfService(new HtmlToBufferRenderer());
    const artifact = await service.renderDocument(buildInvoiceDocument({
      invoiceNumber: invoice.invoiceNumber,
      customerName: invoice.teamId,
      totalCents: invoice.totalCents,
    }));

    return artifact.buffer;
  }
}
