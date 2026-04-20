import { accepted, created, ok } from '../../lib/http.js';
import { asyncHandler } from '../../lib/asyncHandler.js';
import type { IntegrationsService } from './integrations.service.js';

export class IntegrationsController {
  constructor(private readonly service: IntegrationsService) {}

  list = asyncHandler(async (req, res) => {
    ok(res, await this.service.listIntegrations(req.query, req.user!));
  });

  connect = asyncHandler(async (req, res) => {
    const provider = Array.isArray(req.params.provider) ? req.params.provider[0] : req.params.provider;
    created(res, await this.service.connect(provider, req.body, req.user!));
  });

  disconnect = asyncHandler(async (req, res) => {
    const provider = Array.isArray(req.params.provider) ? req.params.provider[0] : req.params.provider;
    ok(res, await this.service.disconnect(provider, req.user!));
  });

  testConnection = asyncHandler(async (req, res) => {
    const provider = Array.isArray(req.params.provider) ? req.params.provider[0] : req.params.provider;
    ok(res, await this.service.testConnection(provider, req.user!));
  });

  sync = asyncHandler(async (req, res) => {
    const provider = Array.isArray(req.params.provider) ? req.params.provider[0] : req.params.provider;
    accepted(res, await this.service.sync(provider, req.user!));
  });
}
