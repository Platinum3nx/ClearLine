import { expect } from 'vitest';

export function expectIsoTimestamp(value: string) {
  expect(new Date(value).toString()).not.toBe('Invalid Date');
}

