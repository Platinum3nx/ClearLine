import { AppError } from '../../../lib/errors.js';

export class PaymentStateError extends AppError {
  constructor(paymentId: string, state: string) {
    super(409, 'payment_state_error', 'Payment ' + paymentId + ' cannot transition from ' + state);
  }
}

