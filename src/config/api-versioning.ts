import type { ApiVersion } from '../types/api-version.js';

export interface ApiVersionCatalogEntry {
  version: ApiVersion;
  label: string;
  lifecycle: 'current' | 'deprecated';
  default: boolean;
  recommended: boolean;
  routePrefix: `/${ApiVersion}`;
  releasedAt: string;
  sunsetDate?: string;
}

const versionCatalog: ApiVersionCatalogEntry[] = [
  {
    version: 'v1',
    label: 'Core platform API',
    lifecycle: 'deprecated',
    default: true,
    recommended: false,
    routePrefix: '/v1',
    releasedAt: '2024-03-18',
    sunsetDate: '2026-12-31',
  },
  {
    version: 'v2',
    label: 'Reporting and integrations API',
    lifecycle: 'current',
    default: false,
    recommended: true,
    routePrefix: '/v2',
    releasedAt: '2025-09-09',
  },
];

export const apiVersioning = {
  defaultVersion: 'v1' as ApiVersion,
  recommendedVersion: 'v2' as ApiVersion,
  supportedVersions: versionCatalog.map((entry) => entry.version) as ApiVersion[],
  deprecatedVersions: versionCatalog
    .filter((entry) => entry.lifecycle === 'deprecated')
    .map((entry) => entry.version) as ApiVersion[],
  versionCatalog,
};
