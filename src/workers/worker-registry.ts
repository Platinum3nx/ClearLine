import { runAdminAuditWorker } from './admin-audit.worker.js';
import { runAnalyticsWorker } from './analytics.worker.js';
import { runEmailDispatchWorker } from './email-dispatch.worker.js';
import { runInvoicePdfWorker } from './invoice-pdf.worker.js';
import { runQuickBooksSyncWorker } from './quickbooks-sync.worker.js';
import { runReconciliationWorker } from './reconciliation.worker.js';
import { runReportingWorker } from './reporting.worker.js';
import { runSalesforceSyncWorker } from './salesforce-sync.worker.js';
import { runSlackSyncWorker } from './slack-sync.worker.js';
import { runSubscriptionRenewalWorker } from './subscription-renewal.worker.js';
import { runWebhookDeliveryWorker } from './webhook-delivery.worker.js';
import type { WorkerDefinition } from './types.js';

export const workerRegistry: WorkerDefinition[] = [
  { name: 'reporting', handler: runReportingWorker },
  { name: 'analytics', handler: runAnalyticsWorker },
  { name: 'webhook-delivery', handler: runWebhookDeliveryWorker },
  { name: 'slack-sync', handler: runSlackSyncWorker },
  { name: 'salesforce-sync', handler: runSalesforceSyncWorker },
  { name: 'quickbooks-sync', handler: runQuickBooksSyncWorker },
  { name: 'invoice-pdf', handler: runInvoicePdfWorker },
  { name: 'email-dispatch', handler: runEmailDispatchWorker },
  { name: 'admin-audit', handler: runAdminAuditWorker },
  { name: 'subscription-renewal', handler: runSubscriptionRenewalWorker },
  { name: 'reconciliation', handler: runReconciliationWorker },
];
