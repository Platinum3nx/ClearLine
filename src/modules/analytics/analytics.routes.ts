import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth.js';
import { requireRole } from '../../middleware/requireRole.js';
import { analyticsIngestRateLimiter, publicRateLimiter, reportRunRateLimiter } from '../../middleware/rateLimiter.js';
import { validate } from '../../middleware/validate.js';
import type { AnalyticsController } from './analytics.controller.js';
import { listFunnelsQuerySchema } from './dtos/list-funnels.query.js';
import { queryMetricsRequestSchema } from './dtos/query-metrics.request.js';
import { trackEventRequestSchema } from './dtos/track-event.request.js';

export function buildAnalyticsRouter(controller: AnalyticsController) {
  const router = Router();

  router.use(requireAuth, publicRateLimiter);
  router.post('/metrics/query', reportRunRateLimiter, requireRole('owner', 'admin'), validate(queryMetricsRequestSchema), controller.queryMetrics);
  router.get('/funnels', validate(listFunnelsQuerySchema, 'query'), controller.listFunnels);
  router.post('/events', analyticsIngestRateLimiter, validate(trackEventRequestSchema), controller.trackEvent);

  return router;
}
