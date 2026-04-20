import { Router } from 'express';
import { publicRateLimiter } from '../middleware/rateLimiter.js';
import { createAdminModule } from '../modules/admin/admin.module.js';
import { createAnalyticsModule } from '../modules/analytics/analytics.module.js';
import { createAuthModule } from '../modules/auth/auth.module.js';
import { createBillingModule } from '../modules/billing/billing.module.js';
import { createIntegrationsModule } from '../modules/integrations/integrations.module.js';
import { createInvoicingModule } from '../modules/invoicing/invoicing.module.js';
import { createPaymentsModule } from '../modules/payments/payments.module.js';
import { createReportingModule } from '../modules/reporting/reporting.module.js';
import { createTeamsModule } from '../modules/teams/teams.module.js';
import { createUsersModule } from '../modules/users/users.module.js';
import { createWebhooksModule } from '../modules/webhooks/webhooks.module.js';

export function buildV1Router() {
  const router = Router();

  router.get('/health', publicRateLimiter, (_req, res) => {
    res.json({ status: 'ok', service: 'clearline-api', version: 'v1' });
  });

  router.use('/auth', createAuthModule().router);
  router.use('/users', createUsersModule().router);
  router.use('/teams', createTeamsModule().router);
  router.use('/billing', createBillingModule().router);
  router.use('/invoices', createInvoicingModule().router);
  router.use('/payments', createPaymentsModule().router);
  router.use('/reporting', createReportingModule().router);
  router.use('/analytics', createAnalyticsModule().router);
  router.use('/integrations', createIntegrationsModule().router);
  router.use('/webhooks', createWebhooksModule().router);
  router.use('/ops/admin-preview', createAdminModule().router);

  return router;
}
