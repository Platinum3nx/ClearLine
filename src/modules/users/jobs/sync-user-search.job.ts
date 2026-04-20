import { logger } from '../../../config/logger.js';

export async function syncUserSearchIndex() {
  logger.info({ index: 'users_v2' }, 'syncing user search index');
}

