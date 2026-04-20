import { processSubscriptionRenewals } from '../modules/billing/jobs/process-subscription-renewals.job.js';

export async function runSubscriptionRenewalWorker() {
  await processSubscriptionRenewals();
}
