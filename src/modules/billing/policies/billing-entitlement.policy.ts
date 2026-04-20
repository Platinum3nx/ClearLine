import { ForbiddenError } from '../../../lib/errors.js';

export function ensureEntitledToBilling(roles: string[]) {
  if (!roles.some((role) => role === 'owner' || role === 'admin')) {
    throw new ForbiddenError('Billing operations require billing admin privileges');
  }
}

