import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../lib/errors.js';
import { buildVersionHeaders, resolveApiVersion } from '../lib/versioning.js';
import type { ApiVersion } from '../types/api-version.js';

export function detectApiVersion(req: Request, res: Response, next: NextFunction) {
  const version = resolveApiVersion(req);
  req.apiVersion = version;
  const headers = buildVersionHeaders(version);

  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  next();
}

export function requireApiVersion(version: ApiVersion) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (req.apiVersion && req.apiVersion !== version) {
      next(new AppError(406, 'unsupported_api_version', 'Request was routed to an unexpected API version'));
      return;
    }

    next();
  };
}
