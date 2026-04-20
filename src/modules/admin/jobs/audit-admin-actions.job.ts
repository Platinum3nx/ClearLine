import { logger } from '../../../config/logger.js';

export async function auditAdminActions() {
  logger.info('aggregating admin action audits');
}
