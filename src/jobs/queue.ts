import { logger } from '../config/logger.js';

export const queueRegistry = {
  subscriptions: 'subscriptions',
  invoices: 'invoices',
  payments: 'payments',
  users: 'users',
};

export async function enqueue(queueName: string, payload: unknown) {
  logger.info({ queueName, payload }, 'demo job enqueued');
}

