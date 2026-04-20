import { randomUUID } from 'node:crypto';
import { database } from '../../config/database.js';
import type { TeamRecord } from './teams.types.js';

function buildTeam(overrides: Partial<TeamRecord> = {}): TeamRecord {
  return {
    id: randomUUID(),
    name: 'Northwind Operations',
    slug: 'northwind-ops',
    seatLimit: 25,
    seatCount: 14,
    defaultCurrency: 'USD',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export class TeamsRepository {
  async listTeams(input: { search: string; pagination: { page: number; pageSize: number; offset: number } }) {
    await database.query('select * from teams limit $1 offset $2', [input.pagination.pageSize, input.pagination.offset]);
    return [buildTeam(), buildTeam({ name: 'Blue Mesa Holdings', slug: 'blue-mesa' })];
  }

  async findById(teamId: string) {
    await database.one('select * from teams where id = $1', [teamId]);
    return buildTeam({ id: teamId });
  }

  async createTeam(input: Record<string, unknown>) {
    await database.query('insert into teams values ($1, $2)', [input.name, input.slug]);
    return buildTeam({
      name: String(input.name),
      slug: String(input.slug),
      seatLimit: Number(input.seatLimit ?? 5),
      defaultCurrency: String(input.defaultCurrency ?? 'USD'),
    });
  }

  async updateTeam(teamId: string, input: Record<string, unknown>) {
    await database.query('update teams set profile = $1 where id = $2', [JSON.stringify(input), teamId]);
    return buildTeam({ id: teamId, ...(input as Partial<TeamRecord>) });
  }

  async addMember(teamId: string, input: Record<string, unknown>) {
    await database.query('insert into memberships values ($1, $2, $3)', [teamId, input.userId, input.title]);
    return {
      membershipId: randomUUID(),
      teamId,
      userId: String(input.userId),
      title: String(input.title ?? 'Member'),
    };
  }
}

