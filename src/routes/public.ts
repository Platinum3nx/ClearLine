import { Router } from 'express';
import { apiVersioning } from '../config/api-versioning.js';
import { ok } from '../lib/http.js';
import { publicRateLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.js';
import { listVersionsQuerySchema } from './dtos/list-versions.query.js';
import type { ListVersionsQuery } from './dtos/list-versions.query.js';

export function buildPublicRouter() {
  const router = Router();

  router.get('/health', publicRateLimiter, (_req, res) => {
    res.json({ status: 'ok', service: 'clearline-api', visibility: 'public' });
  });

  router.get('/versions', publicRateLimiter, validate(listVersionsQuerySchema, 'query'), (req, res) => {
    const query = req.query as unknown as ListVersionsQuery;
    const versions = apiVersioning.versionCatalog.filter((entry) => query.includeDeprecated || entry.lifecycle !== 'deprecated');

    ok(res, {
      defaultVersion: apiVersioning.defaultVersion,
      recommendedVersion: apiVersioning.recommendedVersion,
      supportedVersions: versions.map((entry) => entry.version),
      deprecatedVersions: versions.filter((entry) => entry.lifecycle === 'deprecated').map((entry) => entry.version),
      versions,
    });
  });

  return router;
}
