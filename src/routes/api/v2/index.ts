import { Router } from 'express';
import { apiThrottle } from '../../../middleware/apiThrottle.js';
import { createAnalyticsModule } from '../../../modules/analytics/analytics.module.js';
import { createIntegrationsModule } from '../../../modules/integrations/integrations.module.js';
import { createReportingModule } from '../../../modules/reporting/reporting.module.js';
import { createWebhooksModule } from '../../../modules/webhooks/webhooks.module.js';

export function buildV2Router() {
  const router = Router();

  router.use(apiThrottle);

  router.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'clearline-api', version: 'v2' });
  });

  router.use('/reporting', createReportingModule().router);
  router.use('/analytics', createAnalyticsModule().router);
  router.use('/integrations', createIntegrationsModule().router);
  router.use('/webhooks', createWebhooksModule().router);

  return router;
}
