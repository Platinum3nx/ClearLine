import { ForbiddenError } from '../../../lib/errors.js';

export function ensureAdminSurfaceAccess(roles: string[]) {
  if (!roles.some((role) => role === 'owner' || role === 'admin')) {
    throw new ForbiddenError('Admin surface requires elevated access');
  }
}
