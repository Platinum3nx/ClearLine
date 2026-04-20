import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('integrations OpenAPI contract', () => {
  it('contains the expected path marker', () => {
    const document = readFileSync(join(process.cwd(), 'openapi/paths/integrations.yaml'), 'utf-8');
    expect(document).toContain('/integrations');
  });
});

