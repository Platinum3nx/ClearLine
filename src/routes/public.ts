import { Router } from 'express';
import { publicRateLimiter } from '../middleware/rateLimiter.js';
import { apiVersioning } from '../config/api-versioning.js';

export function buildPublicRouter() {
  const router = Router();

  router.get('/health', publicRateLimiter, (_req, res) => {
    res.json({ status: 'ok', service: 'clearline-api', visibility: 'public' });
  });

  router.get('/versions', publicRateLimiter, (_req, res) => {
    res.json({
      data: {
        defaultVersion: apiVersioning.defaultVersion,
        supportedVersions: apiVersioning.supportedVersions,
        deprecatedVersions: apiVersioning.deprecatedVersions,
      },
    });
  });

  return router;
}
