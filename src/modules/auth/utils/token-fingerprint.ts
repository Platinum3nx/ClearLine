import { createHash } from 'node:crypto';

export function hashRefreshTokenFingerprint(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

