import { invoiceSchema } from '../schemas/invoice.schema.js';

export const createInvoiceRequestSchema = invoiceSchema.pick({
  currency: true,
  subtotalCents: true,
  taxCents: true,
  totalCents: true,
  dueDate: true,
});

