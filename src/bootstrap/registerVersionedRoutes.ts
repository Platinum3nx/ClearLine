import type { Express } from 'express';
import { detectApiVersion, requireApiVersion } from '../middleware/requireApiVersion.js';
import { buildAdminRouter } from '../routes/admin.js';
import { buildPublicRouter } from '../routes/public.js';
import { buildV1Router } from '../routes/v1.js';
import { buildV2Router } from '../routes/v2.js';

export function registerVersionedRoutes(app: Express) {
  app.use(detectApiVersion);
  app.use('/public', buildPublicRouter());
  app.use('/v1', requireApiVersion('v1'), buildV1Router());
  app.use('/v2', requireApiVersion('v2'), buildV2Router());
  app.use('/admin', buildAdminRouter());
}
