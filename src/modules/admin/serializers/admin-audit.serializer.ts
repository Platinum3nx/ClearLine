import type { AuthenticatedPrincipal } from '../../auth/auth.types.js';

export function serializeAdminAuditEntry(actor: AuthenticatedPrincipal, payload: unknown) {
  return {
    actorId: actor.id,
    actorEmail: actor.email,
    payload,
    auditedAt: new Date().toISOString(),
  };
}
