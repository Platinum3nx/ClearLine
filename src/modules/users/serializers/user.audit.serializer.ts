import type { AuthenticatedPrincipal } from '../../auth/auth.types.js';

export function serializeUserAuditPayload(actor: AuthenticatedPrincipal, payload: unknown) {
  return {
    actorId: actor.id,
    actorEmail: actor.email,
    payload,
    emittedAt: new Date().toISOString(),
  };
}

