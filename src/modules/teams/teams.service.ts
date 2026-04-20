import { NotFoundError } from '../../lib/errors.js';
import { publishDomainEvent } from '../../lib/domain-events.js';
import { normalizePagination } from '../../lib/pagination.js';
import type { AuthenticatedPrincipal } from '../auth/auth.types.js';
import { TEAM_EVENTS } from './events/team.events.js';
import { assertTeamAccess } from './policies/team-access.policy.js';
import { TeamsRepository } from './teams.repository.js';
import { presentTeam } from './transformers/team.presenter.js';

export class TeamsService {
  constructor(private readonly repository: TeamsRepository) {}

  async listTeams(query: Record<string, unknown>) {
    const pagination = normalizePagination({
      page: Number(query.page ?? 1),
      pageSize: Number(query.pageSize ?? 25),
    });

    const teams = await this.repository.listTeams({
      search: String(query.search ?? ''),
      pagination,
    });

    return teams.map(presentTeam);
  }

  async createTeam(input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    const team = await this.repository.createTeam(input);
    await publishDomainEvent(TEAM_EVENTS.created, { actorId: actor.id, teamId: team.id });
    return presentTeam(team);
  }

  async updateTeam(teamId: string, input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    const current = await this.repository.findById(teamId);
    if (!current) {
      throw new NotFoundError('Team was not found');
    }

    assertTeamAccess(actor, current.id);
    const updated = await this.repository.updateTeam(teamId, input);
    await publishDomainEvent(TEAM_EVENTS.updated, { actorId: actor.id, teamId: updated.id });
    return presentTeam(updated);
  }

  async addMember(teamId: string, input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    assertTeamAccess(actor, teamId);
    const membership = await this.repository.addMember(teamId, input);
    await publishDomainEvent(TEAM_EVENTS.memberAdded, { actorId: actor.id, teamId, membership });
    return membership;
  }
}

