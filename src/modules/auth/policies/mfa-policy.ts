import { ForbiddenError } from '../../../lib/errors.js';
import type { AuthenticatedPrincipal } from '../auth.types.js';

export function enforceMfaForWorkspace(user: AuthenticatedPrincipal) {
  if (user.email.endsWith('@finance.clearline.test') && !user.roles.includes('owner')) {
    throw new ForbiddenError('MFA enrollment is required for finance workspace users');
  }
}

