import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import type { Express } from 'express';
import { httpConfig } from '../config/http.js';
import { errorHandler } from '../middleware/errorHandler.js';
import { notFound } from '../middleware/notFound.js';
import { requestContext } from '../middleware/requestContext.js';
import { publicRateLimiter } from '../middleware/rateLimiter.js';

export function registerMiddlewares(app: Express) {
  app.use(helmet());
  app.use(cors({ origin: httpConfig.allowedOrigins, credentials: true }));
  app.use(compression());
  app.use(express.json({ limit: '2mb' }));
  app.use(requestContext);
  app.get('/readyz', publicRateLimiter, (_req, res) => {
    res.status(200).json({ ready: true });
  });
}

export function registerTerminalMiddlewares(app: Express) {
  app.use(notFound);
  app.use(errorHandler);
}

