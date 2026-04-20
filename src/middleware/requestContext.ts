import { randomUUID } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';

export function requestContext(req: Request, _res: Response, next: NextFunction) {
  req.requestId = req.get('x-request-id') ?? randomUUID();
  req.tenantId = req.get('x-tenant-id') ?? 'tenant_demo_001';
  next();
}

