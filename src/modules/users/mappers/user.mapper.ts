import type { UserRecord } from '../users.types.js';

export function mapUserToAuditEntry(user: UserRecord) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
  };
}

