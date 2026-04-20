import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth.js';
import { requireRole } from '../../middleware/requireRole.js';
import { adminMutationRateLimiter, publicRateLimiter } from '../../middleware/rateLimiter.js';
import { validate } from '../../middleware/validate.js';
import type { BillingController } from './billing.controller.js';
import { createPlanRequestSchema } from './dtos/create-plan.request.js';
import { previewUpgradeRequestSchema } from './dtos/preview-upgrade.request.js';
import { updateSubscriptionRequestSchema } from './dtos/update-subscription.request.js';

export function buildBillingRouter(controller: BillingController) {
  const router = Router();

  router.use(requireAuth, publicRateLimiter);
  router.get('/plans', controller.listPlans);
  router.post('/plans', adminMutationRateLimiter, requireRole('owner'), validate(createPlanRequestSchema), controller.createPlan);
  router.patch('/subscription', adminMutationRateLimiter, requireRole('owner', 'admin'), validate(updateSubscriptionRequestSchema), controller.updateSubscription);
  router.post('/subscription/preview', adminMutationRateLimiter, requireRole('owner', 'admin'), validate(previewUpgradeRequestSchema), controller.previewUpgrade);

  return router;
}

