import type { Request, Response } from 'express';

export function notFound(req: Request, res: Response) {
  res.status(404).json({
    error: {
      code: 'not_found',
      message: 'No route registered for ' + req.method + ' ' + req.originalUrl,
    },
  });
}

