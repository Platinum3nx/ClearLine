import express from 'express';
import { registerDocs } from './bootstrap/registerDocs.js';
import { registerMiddlewares } from './bootstrap/registerMiddlewares.js';
import { registerObservability } from './bootstrap/registerObservability.js';
import { registerRoutes } from './bootstrap/registerRoutes.js';

export function createApp() {
  const app = express();

  registerObservability(app);
  registerMiddlewares(app);
  registerDocs(app);
  registerRoutes(app);

  return app;
}

