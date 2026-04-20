import type { Request } from 'express';
import { apiVersioning } from '../config/api-versioning.js';
import type { ApiVersion } from '../types/api-version.js';

export function resolveApiVersion(req: Request): ApiVersion {
  const headerVersion = req.get('x-api-version');

  if (headerVersion === 'v2') {
    return 'v2';
  }

  if (req.originalUrl.startsWith('/v2')) {
    return 'v2';
  }

  return apiVersioning.defaultVersion;
}

export function buildVersionHeaders(version: ApiVersion) {
  return {
    'x-clearline-api-version': version,
    'x-clearline-api-default-version': apiVersioning.defaultVersion,
  };
}
