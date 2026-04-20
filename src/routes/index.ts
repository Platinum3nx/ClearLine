import { Router } from 'express';
import { publicRateLimiter } from '../middleware/rateLimiter.js';
import { createAuthModule } from '../modules/auth/auth.module.js';
import { createBillingModule } from '../modules/billing/billing.module.js';
import { createInvoicingModule } from '../modules/invoicing/invoicing.module.js';
import { createPaymentsModule } from '../modules/payments/payments.module.js';
import { createTeamsModule } from '../modules/teams/teams.module.js';
import { createUsersModule } from '../modules/users/users.module.js';

export function buildApiRouter() {
  const router = Router();

  router.get('/health', publicRateLimiter, (_req, res) => {
    res.json({ status: 'ok', service: 'clearline-api' });
  });

  router.use('/auth', createAuthModule().router);
  router.use('/users', createUsersModule().router);
  router.use('/teams', createTeamsModule().router);
  router.use('/billing', createBillingModule().router);
  router.use('/invoices', createInvoicingModule().router);
  router.use('/payments', createPaymentsModule().router);

  return router;
}

