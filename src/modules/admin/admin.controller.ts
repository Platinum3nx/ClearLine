import { accepted, ok } from '../../lib/http.js';
import { asyncHandler } from '../../lib/asyncHandler.js';
import type { AdminService } from './admin.service.js';

export class AdminController {
  constructor(private readonly service: AdminService) {}

  searchAccounts = asyncHandler(async (req, res) => {
    ok(res, await this.service.searchAccounts(req.query, req.user!));
  });

  updateFeatureFlag = asyncHandler(async (req, res) => {
    const flagKey = Array.isArray(req.params.flagKey) ? req.params.flagKey[0] : req.params.flagKey;
    ok(res, await this.service.updateFeatureFlag(flagKey, req.body, req.user!));
  });

  impersonateUser = asyncHandler(async (req, res) => {
    accepted(res, await this.service.impersonateUser(req.body, req.user!));
  });
}
