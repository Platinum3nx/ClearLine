import { publishDomainEvent } from '../../lib/domain-events.js';
import type { AuthenticatedPrincipal } from '../auth/auth.types.js';
import { ADMIN_EVENTS } from './events/admin.events.js';
import { AdminRepository } from './admin.repository.js';
import { serializeAdminAuditEntry } from './serializers/admin-audit.serializer.js';
import { presentAccountSearch, presentFeatureFlag } from './transformers/admin.presenter.js';

export class AdminService {
  constructor(private readonly repository: AdminRepository) {}

  async searchAccounts(query: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    const results = await this.repository.searchAccounts({
      query: String(query.query ?? ''),
      status: query.status ? String(query.status) : undefined,
    });
    await publishDomainEvent(ADMIN_EVENTS.accountsSearched, serializeAdminAuditEntry(actor, { query }));
    return presentAccountSearch(results);
  }

  async updateFeatureFlag(flagKey: string, input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    const flag = await this.repository.updateFeatureFlag(flagKey, input);
    await publishDomainEvent(ADMIN_EVENTS.featureFlagUpdated, serializeAdminAuditEntry(actor, { flagKey, input }));
    return presentFeatureFlag(flag);
  }

  async impersonateUser(input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    const impersonation = await this.repository.createImpersonationSession(input);
    await publishDomainEvent(ADMIN_EVENTS.userImpersonated, serializeAdminAuditEntry(actor, impersonation));
    return impersonation;
  }
}
