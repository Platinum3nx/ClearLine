import { ForbiddenError } from '../../../lib/errors.js';

export function assertReportingAccess(roles: string[]) {
  if (!roles.some((role) => role === 'owner' || role === 'admin')) {
    throw new ForbiddenError('Reporting access requires admin or owner privileges');
  }
}
