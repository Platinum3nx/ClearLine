import { readFileSync } from 'node:fs';

export function loadOpenApiFragment(pathName: string) {
  return readFileSync(pathName, 'utf-8');
}

