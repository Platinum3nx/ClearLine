import type { RequestHandler } from 'express';
import type { ZodTypeAny } from 'zod';
import { ValidationError } from '../lib/errors.js';

export function validate(schema: ZodTypeAny, target: 'body' | 'query' | 'params' = 'body'): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      next(new ValidationError(result.error.flatten()));
      return;
    }

    (req as any)[target] = result.data;
    next();
  };
}

