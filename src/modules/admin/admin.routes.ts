import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth.js';
import { adminMutationRateLimiter, publicRateLimiter } from '../../middleware/rateLimiter.js';
import { validate } from '../../middleware/validate.js';
import type { AdminController } from './admin.controller.js';
import { impersonateUserRequestSchema } from './dtos/impersonate-user.request.js';
import { searchAccountsQuerySchema } from './dtos/search-accounts.query.js';
import { updateFeatureFlagRequestSchema } from './dtos/update-feature-flag.request.js';
import { ensureAdminSurfaceAccess } from './policies/admin-access.policy.js';

export function buildAdminModuleRouter(controller: AdminController) {
  const router = Router();

  router.use(requireAuth, publicRateLimiter, (req, _res, next) => {
    ensureAdminSurfaceAccess(req.user?.roles ?? []);
    next();
  });
  router.get('/accounts', validate(searchAccountsQuerySchema, 'query'), controller.searchAccounts);
  router.patch('/feature-flags/:flagKey', adminMutationRateLimiter, validate(updateFeatureFlagRequestSchema), controller.updateFeatureFlag);
  router.post('/impersonations', adminMutationRateLimiter, validate(impersonateUserRequestSchema), controller.impersonateUser);

  return router;
}
