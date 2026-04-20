import { ForbiddenError } from '../../../lib/errors.js';

export function assertIntegrationAccess(roles: string[], provider: string) {
  if (!roles.some((role) => role === 'owner' || role === 'admin')) {
    throw new ForbiddenError('Cannot manage ' + provider + ' integration without elevated access');
  }
}
