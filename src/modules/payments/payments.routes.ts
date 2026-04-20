import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth.js';
import { requireRole } from '../../middleware/requireRole.js';
import { paymentMutationRateLimiter, publicRateLimiter } from '../../middleware/rateLimiter.js';
import { validate } from '../../middleware/validate.js';
import type { PaymentsController } from './payments.controller.js';
import { confirmPaymentRequestSchema } from './dtos/confirm-payment.request.js';
import { createPaymentIntentRequestSchema } from './dtos/create-payment-intent.request.js';
import { refundPaymentRequestSchema } from './dtos/refund-payment.request.js';

export function buildPaymentsRouter(controller: PaymentsController) {
  const router = Router();

  router.use(requireAuth, publicRateLimiter);
  router.get('/', controller.list);
  router.post('/intents', paymentMutationRateLimiter, requireRole('owner', 'admin'), validate(createPaymentIntentRequestSchema), controller.createIntent);
  router.post('/:paymentId/confirm', paymentMutationRateLimiter, requireRole('owner', 'admin'), validate(confirmPaymentRequestSchema), controller.confirm);
  router.post('/:paymentId/refund', paymentMutationRateLimiter, requireRole('owner', 'admin'), validate(refundPaymentRequestSchema), controller.refund);

  return router;
}

