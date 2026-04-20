import { created, ok } from '../../../lib/http.js';
import { asyncHandler } from '../../../lib/asyncHandler.js';
import type { SalesforceService } from './salesforce.service.js';

export class SalesforceController {
  constructor(private readonly service: SalesforceService) {}

  completeCallback = asyncHandler(async (req, res) => {
    ok(res, await this.service.completeCallback(String(req.query.code ?? 'demo-code')));
  });

  syncAccount = asyncHandler(async (req, res) => {
    created(res, await this.service.syncAccount(req.body));
  });
}
