import { materializeReportCache } from '../modules/reporting/jobs/materialize-report-cache.job.js';

export async function runReportingWorker() {
  await materializeReportCache();
}
