import { verifyAccessToken } from '../utils/jwt.js';

export async function resolveAccessToken(token: string) {
  return verifyAccessToken(token);
}

