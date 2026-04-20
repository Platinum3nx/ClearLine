import type { ApiVersion } from '../types/api-version.js';

export const apiVersioning = {
  defaultVersion: 'v1' as ApiVersion,
  supportedVersions: ['v1', 'v2'] as ApiVersion[],
  deprecatedVersions: ['v1'] as ApiVersion[],
};
