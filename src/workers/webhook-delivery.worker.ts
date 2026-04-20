import { retryWebhookDeliveries } from '../modules/webhooks/jobs/retry-deliveries.job.js';

export async function runWebhookDeliveryWorker() {
  await retryWebhookDeliveries();
}
