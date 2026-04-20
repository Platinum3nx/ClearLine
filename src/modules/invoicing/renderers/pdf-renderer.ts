import type { InvoiceRecord } from '../invoicing.types.js';

export class InvoicePdfRenderer {
  async render(invoice: InvoiceRecord) {
    const html = '<html><body><h1>' + invoice.invoiceNumber + '</h1><p>Total: ' + invoice.totalCents + '</p></body></html>';
    return Buffer.from(html, 'utf-8');
  }
}

