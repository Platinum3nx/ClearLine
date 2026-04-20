import { Router } from 'express';
import { integrationSyncRateLimiter, publicRateLimiter } from '../../../middleware/rateLimiter.js';
import { validate } from '../../../middleware/validate.js';
import type { QuickBooksController } from './quickbooks.controller.js';
import { pushInvoiceRequestSchema } from './dtos/push-invoice.request.js';

export function buildQuickBooksRouter(controller: QuickBooksController) {
  const router = Router();

  router.get('/callback', publicRateLimiter, controller.completeCallback);
  router.post('/invoices/push', integrationSyncRateLimiter, validate(pushInvoiceRequestSchema), controller.pushInvoice);

  return router;
}
