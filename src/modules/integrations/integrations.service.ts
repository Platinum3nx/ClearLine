import { publishDomainEvent } from '../../lib/domain-events.js';
import type { AuthenticatedPrincipal } from '../auth/auth.types.js';
import { INTEGRATION_EVENTS } from './events/integration.events.js';
import { assertIntegrationAccess } from './policies/integration-access.policy.js';
import { IntegrationsRepository } from './integrations.repository.js';
import { presentIntegration } from './transformers/integration.presenter.js';

export class IntegrationsService {
  constructor(private readonly repository: IntegrationsRepository) {}

  async listIntegrations(_query: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    const integrations = await this.repository.listByTeam(actor.teamId);
    return integrations.map(presentIntegration);
  }

  async connect(provider: string, input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    assertIntegrationAccess(actor.roles, provider);
    const connection = await this.repository.connect(provider, {
      ...input,
      teamId: actor.teamId,
    });
    await publishDomainEvent(INTEGRATION_EVENTS.connected, { actorId: actor.id, provider });
    return presentIntegration(connection);
  }

  async disconnect(provider: string, actor: AuthenticatedPrincipal) {
    assertIntegrationAccess(actor.roles, provider);
    const disconnected = await this.repository.disconnect(provider, actor.teamId);
    await publishDomainEvent(INTEGRATION_EVENTS.disconnected, { actorId: actor.id, provider });
    return disconnected;
  }

  async testConnection(provider: string, actor: AuthenticatedPrincipal) {
    assertIntegrationAccess(actor.roles, provider);
    return {
      provider,
      ok: true,
      testedAt: new Date().toISOString(),
      teamId: actor.teamId,
    };
  }

  async sync(provider: string, actor: AuthenticatedPrincipal) {
    assertIntegrationAccess(actor.roles, provider);
    const sync = await this.repository.enqueueSync(provider, actor.teamId);
    await publishDomainEvent(INTEGRATION_EVENTS.syncRequested, { actorId: actor.id, provider });
    return sync;
  }
}
