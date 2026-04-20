import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('analytics OpenAPI contract', () => {
  it('contains the expected path marker', () => {
    const document = readFileSync(join(process.cwd(), 'openapi/paths/analytics-metrics.yaml'), 'utf-8');
    expect(document).toContain('/analytics/metrics');
  });
});

