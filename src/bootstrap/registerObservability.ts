import type { Express, NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger.js';

export function registerObservability(app: Express) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const startedAt = Date.now();

    res.on('finish', () => {
      const payload = {
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs: Date.now() - startedAt,
        requestId: req.requestId,
      };

      if (res.statusCode >= 500) {
        logger.error(payload, 'request completed');
        return;
      }

      if (res.statusCode >= 400) {
        logger.warn(payload, 'request completed');
        return;
      }

      logger.info(payload, 'request completed');
    });

    next();
  });
}
