import type { Express } from 'express';
import { buildApiRouter } from '../routes/index.js';
import { registerTerminalMiddlewares } from './registerMiddlewares.js';

export function registerRoutes(app: Express) {
  app.use('/v1', buildApiRouter());
  registerTerminalMiddlewares(app);
}

