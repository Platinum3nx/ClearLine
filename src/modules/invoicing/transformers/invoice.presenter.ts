import type { InvoiceRecord } from '../invoicing.types.js';

export function presentInvoice(invoice: InvoiceRecord) {
  return {
    id: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    status: invoice.status,
    currency: invoice.currency,
    totalCents: invoice.totalCents,
    dueDate: invoice.dueDate,
  };
}

