import { Router } from 'express';
import { createAdminModule } from '../modules/admin/admin.module.js';

export function buildAdminRouter() {
  const router = Router();

  router.use('/', createAdminModule().router);

  return router;
}
