import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('public openapi contract', () => {
  it('documents version catalog metadata and deprecated filtering', () => {
    const document = readFileSync(join(process.cwd(), 'openapi/paths/versions.yaml'), 'utf-8');

    expect(document).toContain('recommendedVersion');
    expect(document).toContain('includeDeprecated');
    expect(document).toContain('lifecycle');
  });
});
