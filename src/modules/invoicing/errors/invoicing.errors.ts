import { AppError } from '../../../lib/errors.js';

export class InvoiceStateError extends AppError {
  constructor(invoiceId: string, state: string) {
    super(409, 'invoice_state_error', 'Invoice ' + invoiceId + ' is not valid for state transition from ' + state);
  }
}

