import type { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger.js';
import { toErrorResponse } from '../lib/errors.js';

export function errorHandler(error: unknown, req: Request, res: Response, _next: NextFunction) {
  const response = toErrorResponse(error);
  logger.error({ error, path: req.path, requestId: req.requestId }, 'request failed');
  res.status(response.statusCode).json(response.body);
}

