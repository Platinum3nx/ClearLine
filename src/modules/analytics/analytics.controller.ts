import { accepted, ok } from '../../lib/http.js';
import { asyncHandler } from '../../lib/asyncHandler.js';
import type { AnalyticsService } from './analytics.service.js';

export class AnalyticsController {
  constructor(private readonly service: AnalyticsService) {}

  queryMetrics = asyncHandler(async (req, res) => {
    ok(res, await this.service.queryMetrics(req.body, req.user!));
  });

  listFunnels = asyncHandler(async (req, res) => {
    ok(res, await this.service.listFunnels(req.query, req.user!));
  });

  trackEvent = asyncHandler(async (req, res) => {
    accepted(res, await this.service.trackEvent(req.body, req.user!));
  });
}
