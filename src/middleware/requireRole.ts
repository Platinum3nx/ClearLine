import type { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../lib/errors.js';

export function requireRole(...allowedRoles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const roles = req.user?.roles ?? [];
    const hasAccess = roles.some((role) => allowedRoles.includes(role));

    if (!hasAccess) {
      next(new ForbiddenError('You do not have permission for this operation'));
      return;
    }

    next();
  };
}

