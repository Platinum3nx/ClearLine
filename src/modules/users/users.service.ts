import { NotFoundError } from '../../lib/errors.js';
import { publishDomainEvent } from '../../lib/domain-events.js';
import { normalizePagination } from '../../lib/pagination.js';
import type { AuthenticatedPrincipal } from '../auth/auth.types.js';
import { USER_EVENTS } from './events/user.events.js';
import { mapUserToAuditEntry } from './mappers/user.mapper.js';
import { assertAssignableRole } from './policies/user-role-policy.js';
import { UsersRepository } from './users.repository.js';
import { serializeUserAuditPayload } from './serializers/user.audit.serializer.js';
import { presentUser } from './transformers/user.presenter.js';

export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async listUsers(query: Record<string, unknown>) {
    const pagination = normalizePagination({
      page: Number(query.page ?? 1),
      pageSize: Number(query.pageSize ?? 25),
    });

    const users = await this.repository.listUsers({
      search: String(query.search ?? ''),
      status: query.status ? String(query.status) : undefined,
      pagination,
    });

    return users.map(presentUser);
  }

  async createUser(input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    assertAssignableRole(actor.roles, String(input.role ?? 'member'));
    const user = await this.repository.createUser(input);
    await publishDomainEvent(USER_EVENTS.created, serializeUserAuditPayload(actor, mapUserToAuditEntry(user)));
    return presentUser(user);
  }

  async updateUser(userId: string, input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    const current = await this.repository.findById(userId);
    if (!current) {
      throw new NotFoundError('User was not found');
    }

    const updated = await this.repository.updateUser(userId, input);
    await publishDomainEvent(USER_EVENTS.updated, serializeUserAuditPayload(actor, mapUserToAuditEntry(updated)));
    return presentUser(updated);
  }

  async inviteUser(input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    assertAssignableRole(actor.roles, String(input.role ?? 'member'));
    const invitation = await this.repository.createInvitation(input);
    await publishDomainEvent(USER_EVENTS.invited, serializeUserAuditPayload(actor, invitation));
    return invitation;
  }
}

