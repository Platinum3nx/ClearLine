import type { UserRecord } from '../users.types.js';

export function presentUser(user: UserRecord) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    status: user.status,
    teamId: user.teamId,
  };
}

