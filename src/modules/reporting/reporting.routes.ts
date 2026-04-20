import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth.js';
import { requireRole } from '../../middleware/requireRole.js';
import { adminMutationRateLimiter, publicRateLimiter, reportRunRateLimiter } from '../../middleware/rateLimiter.js';
import { validate } from '../../middleware/validate.js';
import type { ReportingController } from './reporting.controller.js';
import { createReportRequestSchema } from './dtos/create-report.request.js';
import { listReportsQuerySchema } from './dtos/list-reports.query.js';
import { runReportRequestSchema } from './dtos/run-report.request.js';

export function buildReportingRouter(controller: ReportingController) {
  const router = Router();

  router.use(requireAuth, publicRateLimiter);
  router.get('/', validate(listReportsQuerySchema, 'query'), controller.list);
  router.post('/', adminMutationRateLimiter, requireRole('owner', 'admin'), validate(createReportRequestSchema), controller.create);
  router.post('/:reportId/run', reportRunRateLimiter, requireRole('owner', 'admin'), validate(runReportRequestSchema), controller.run);

  return router;
}
