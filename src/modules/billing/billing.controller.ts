import { asyncHandler } from '../../lib/asyncHandler.js';
import { created, ok } from '../../lib/http.js';
import type { BillingService } from './billing.service.js';

export class BillingController {
  constructor(private readonly service: BillingService) {}

  listPlans = asyncHandler(async (_req, res) => {
    ok(res, await this.service.listPlans());
  });

  createPlan = asyncHandler(async (req, res) => {
    created(res, await this.service.createPlan(req.body, req.user!));
  });

  updateSubscription = asyncHandler(async (req, res) => {
    ok(res, await this.service.updateSubscription(req.body, req.user!));
  });

  previewUpgrade = asyncHandler(async (req, res) => {
    ok(res, await this.service.previewUpgrade(req.body, req.user!));
  });
}

