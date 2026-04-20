import type { Router as ExpressRouter } from 'express';
import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth.js';
import { requireRole } from '../../middleware/requireRole.js';
import { adminMutationRateLimiter, integrationSyncRateLimiter, publicRateLimiter } from '../../middleware/rateLimiter.js';
import { validate } from '../../middleware/validate.js';
import type { IntegrationsController } from './integrations.controller.js';
import { connectIntegrationRequestSchema } from './dtos/connect-integration.request.js';
import { listIntegrationsQuerySchema } from './dtos/list-integrations.query.js';

export function buildIntegrationsRouter(
  controller: IntegrationsController,
  connectorRouters: Record<string, ExpressRouter>,
) {
  const router = Router();

  router.use(requireAuth, publicRateLimiter);
  router.get('/', validate(listIntegrationsQuerySchema, 'query'), controller.list);
  router.post('/:provider/connect', adminMutationRateLimiter, requireRole('owner', 'admin'), validate(connectIntegrationRequestSchema), controller.connect);
  router.post('/:provider/disconnect', integrationSyncRateLimiter, requireRole('owner', 'admin'), controller.disconnect);
  router.post('/:provider/test', integrationSyncRateLimiter, requireRole('owner', 'admin'), controller.testConnection);
  router.post('/:provider/sync', integrationSyncRateLimiter, requireRole('owner', 'admin'), controller.sync);
  router.use('/slack', connectorRouters.slack);
  router.use('/salesforce', connectorRouters.salesforce);
  router.use('/quickbooks', connectorRouters.quickbooks);

  return router;
}
