import { ForbiddenError } from '../../../lib/errors.js';

const hierarchy = ['member', 'admin', 'owner'];

export function assertAssignableRole(actorRoles: string[], targetRole: string) {
  const actorRank = Math.max(...actorRoles.map((role) => hierarchy.indexOf(role)).filter((rank) => rank >= 0), 0);
  const targetRank = hierarchy.indexOf(targetRole);

  if (targetRank > actorRank) {
    throw new ForbiddenError('Cannot assign a role higher than your own');
  }
}

