import { AppError } from '../../../../lib/errors.js';

export class QuickBooksInvoicePushError extends AppError {
  constructor(invoiceId: string) {
    super(409, 'quickbooks_invoice_push_failed', 'QuickBooks push failed for ' + invoiceId);
  }
}
