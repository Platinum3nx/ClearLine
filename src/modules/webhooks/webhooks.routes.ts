import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth.js';
import { requireRole } from '../../middleware/requireRole.js';
import { adminMutationRateLimiter, publicRateLimiter, webhookInboundRateLimiter } from '../../middleware/rateLimiter.js';
import { validate } from '../../middleware/validate.js';
import type { WebhooksController } from './webhooks.controller.js';
import { listDeliveriesQuerySchema } from './dtos/list-deliveries.query.js';
import { registerEndpointRequestSchema } from './dtos/register-endpoint.request.js';
import { replayDeliveryRequestSchema } from './dtos/replay-delivery.request.js';

export function buildWebhooksRouter(controller: WebhooksController) {
  const router = Router();

  router.use(requireAuth, publicRateLimiter);
  router.get('/endpoints', controller.listEndpoints);
  router.post('/endpoints', adminMutationRateLimiter, requireRole('owner', 'admin'), validate(registerEndpointRequestSchema), controller.registerEndpoint);
  router.post('/endpoints/:endpointId/ping', webhookInboundRateLimiter, requireRole('owner', 'admin'), controller.pingEndpoint);
  router.get('/deliveries', validate(listDeliveriesQuerySchema, 'query'), controller.listDeliveries);
  router.post('/deliveries/:deliveryId/replay', webhookInboundRateLimiter, requireRole('owner', 'admin'), validate(replayDeliveryRequestSchema), controller.replayDelivery);

  return router;
}
