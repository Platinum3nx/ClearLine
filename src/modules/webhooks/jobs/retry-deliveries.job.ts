import { logger } from '../../../config/logger.js';

export async function retryWebhookDeliveries() {
  logger.info('retrying failed webhook deliveries');
}
