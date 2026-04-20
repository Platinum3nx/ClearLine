import type { Express } from 'express';
import { registerTerminalMiddlewares } from './registerMiddlewares.js';
import { registerVersionedRoutes } from './registerVersionedRoutes.js';

export function registerRoutes(app: Express) {
  registerVersionedRoutes(app);
  registerTerminalMiddlewares(app);
}
