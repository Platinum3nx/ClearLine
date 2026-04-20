import { reconcileSettlements } from '../modules/payments/jobs/reconcile-settlements.job.js';

export async function runReconciliationWorker() {
  await reconcileSettlements();
}
