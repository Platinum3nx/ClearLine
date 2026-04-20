import { ForbiddenError } from '../../../lib/errors.js';

export function assertAnalyticsAccess(roles: string[]) {
  if (!roles.some((role) => role === 'owner' || role === 'admin')) {
    throw new ForbiddenError('Analytics access requires owner or admin privileges');
  }
}
