import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { buildTestApp } from '../helpers/app.factory.js';

describe('public routes', () => {
  it('returns an active-only version catalog when deprecated versions are filtered out', async () => {
    const app = buildTestApp();
    const response = await request(app).get('/public/versions?includeDeprecated=false');

    expect(response.status).toBe(200);
    expect(response.body.data.defaultVersion).toBe('v1');
    expect(response.body.data.recommendedVersion).toBe('v2');
    expect(response.body.data.supportedVersions).toEqual(['v2']);
    expect(response.body.data.deprecatedVersions).toEqual([]);
    expect(response.body.data.versions).toEqual([
      expect.objectContaining({
        version: 'v2',
        lifecycle: 'current',
        recommended: true,
        routePrefix: '/v2',
      }),
    ]);
  });
});
