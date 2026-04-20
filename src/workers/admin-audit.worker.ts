import { auditAdminActions } from '../modules/admin/jobs/audit-admin-actions.job.js';

export async function runAdminAuditWorker() {
  await auditAdminActions();
}
