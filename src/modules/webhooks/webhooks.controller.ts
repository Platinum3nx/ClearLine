import { accepted, created, ok } from '../../lib/http.js';
import { asyncHandler } from '../../lib/asyncHandler.js';
import type { WebhooksService } from './webhooks.service.js';

export class WebhooksController {
  constructor(private readonly service: WebhooksService) {}

  listEndpoints = asyncHandler(async (req, res) => {
    ok(res, await this.service.listEndpoints(req.user!));
  });

  registerEndpoint = asyncHandler(async (req, res) => {
    created(res, await this.service.registerEndpoint(req.body, req.user!));
  });

  pingEndpoint = asyncHandler(async (req, res) => {
    const endpointId = Array.isArray(req.params.endpointId) ? req.params.endpointId[0] : req.params.endpointId;
    ok(res, await this.service.pingEndpoint(endpointId, req.user!));
  });

  listDeliveries = asyncHandler(async (req, res) => {
    ok(res, await this.service.listDeliveries(req.query, req.user!));
  });

  replayDelivery = asyncHandler(async (req, res) => {
    const deliveryId = Array.isArray(req.params.deliveryId) ? req.params.deliveryId[0] : req.params.deliveryId;
    accepted(res, await this.service.replayDelivery(deliveryId, req.body, req.user!));
  });
}
