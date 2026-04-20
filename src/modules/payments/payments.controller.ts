import { asyncHandler } from '../../lib/asyncHandler.js';
import { created, ok } from '../../lib/http.js';
import type { PaymentsService } from './payments.service.js';

export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  list = asyncHandler(async (req, res) => {
    ok(res, await this.service.listPayments(req.user!));
  });

  createIntent = asyncHandler(async (req, res) => {
    created(res, await this.service.createPaymentIntent(req.body, req.user!));
  });

  confirm = asyncHandler(async (req, res) => {
    const paymentId = Array.isArray(req.params.paymentId) ? req.params.paymentId[0] : req.params.paymentId;
    ok(res, await this.service.confirmPayment(paymentId, req.body, req.user!));
  });

  refund = asyncHandler(async (req, res) => {
    const paymentId = Array.isArray(req.params.paymentId) ? req.params.paymentId[0] : req.params.paymentId;
    ok(res, await this.service.refundPayment(paymentId, req.body, req.user!));
  });
}
