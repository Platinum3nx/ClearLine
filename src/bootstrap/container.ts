import { database, logger, redis } from '../config/index.js';
import { queueRegistry } from '../jobs/queue.js';

export const container = {
  database,
  logger,
  redis,
  queueRegistry,
};

