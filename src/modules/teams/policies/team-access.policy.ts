import { ForbiddenError } from '../../../lib/errors.js';
import type { AuthenticatedPrincipal } from '../../auth/auth.types.js';

export function assertTeamAccess(actor: AuthenticatedPrincipal, teamId: string) {
  if (actor.teamId !== teamId && !actor.roles.includes('owner')) {
    throw new ForbiddenError('You do not have access to this team');
  }
}

