import { asyncHandler } from '../../lib/asyncHandler.js';
import { created, ok } from '../../lib/http.js';
import type { ReportingService } from './reporting.service.js';

export class ReportingController {
  constructor(private readonly service: ReportingService) {}

  list = asyncHandler(async (req, res) => {
    ok(res, await this.service.listReports(req.query, req.user!));
  });

  create = asyncHandler(async (req, res) => {
    created(res, await this.service.createReport(req.body, req.user!));
  });

  run = asyncHandler(async (req, res) => {
    const reportId = Array.isArray(req.params.reportId) ? req.params.reportId[0] : req.params.reportId;
    ok(res, await this.service.runReport(reportId, req.body, req.user!));
  });
}
