import type { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../lib/errors.js';
import { verifyAccessToken } from '../modules/auth/utils/jwt.js';

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.get('authorization');

  if (!header?.startsWith('Bearer ')) {
    next(new UnauthorizedError('Missing bearer token'));
    return;
  }

  try {
    req.user = await verifyAccessToken(header.slice(7));
    next();
  } catch (_error) {
    next(new UnauthorizedError('Access token is invalid or expired'));
  }
}

