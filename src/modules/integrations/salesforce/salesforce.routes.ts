import { Router } from 'express';
import { integrationSyncRateLimiter, publicRateLimiter } from '../../../middleware/rateLimiter.js';
import { validate } from '../../../middleware/validate.js';
import type { SalesforceController } from './salesforce.controller.js';
import { syncAccountRequestSchema } from './dtos/sync-account.request.js';

export function buildSalesforceRouter(controller: SalesforceController) {
  const router = Router();

  router.get('/callback', publicRateLimiter, controller.completeCallback);
  router.post('/sync-account', integrationSyncRateLimiter, validate(syncAccountRequestSchema), controller.syncAccount);

  return router;
}
