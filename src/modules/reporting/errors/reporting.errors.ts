import { AppError } from '../../../lib/errors.js';

export class ReportRunError extends AppError {
  constructor(reportId: string) {
    super(409, 'report_run_failed', 'Report run failed for ' + reportId);
  }
}
