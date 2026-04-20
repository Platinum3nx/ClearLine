import { rebuildMetricRollups } from '../modules/analytics/jobs/rebuild-metric-rollups.job.js';

export async function runAnalyticsWorker() {
  await rebuildMetricRollups();
}
