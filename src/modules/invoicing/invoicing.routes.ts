import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth.js';
import { requireRole } from '../../middleware/requireRole.js';
import { invoiceMutationRateLimiter, publicRateLimiter } from '../../middleware/rateLimiter.js';
import { validate } from '../../middleware/validate.js';
import type { InvoicingController } from './invoicing.controller.js';
import { createInvoiceRequestSchema } from './dtos/create-invoice.request.js';
import { finalizeInvoiceRequestSchema } from './dtos/finalize-invoice.request.js';
import { sendInvoiceRequestSchema } from './dtos/send-invoice.request.js';

export function buildInvoicingRouter(controller: InvoicingController) {
  const router = Router();

  router.use(requireAuth, publicRateLimiter);
  router.get('/', controller.list);
  router.post('/', invoiceMutationRateLimiter, requireRole('owner', 'admin'), validate(createInvoiceRequestSchema), controller.create);
  router.post('/:invoiceId/finalize', invoiceMutationRateLimiter, requireRole('owner', 'admin'), validate(finalizeInvoiceRequestSchema), controller.finalize);
  router.post('/:invoiceId/send', invoiceMutationRateLimiter, requireRole('owner', 'admin'), validate(sendInvoiceRequestSchema), controller.send);

  return router;
}

