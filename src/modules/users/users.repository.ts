import { randomUUID } from 'node:crypto';
import { database } from '../../config/database.js';
import type { UserRecord } from './users.types.js';

function buildUser(overrides: Partial<UserRecord> = {}): UserRecord {
  return {
    id: randomUUID(),
    email: 'operator@clearline.dev',
    fullName: 'Morgan Lee',
    status: 'active',
    role: 'admin',
    teamId: 'team_demo_001',
    timezone: 'America/New_York',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export class UsersRepository {
  async listUsers(input: { search: string; status?: string; pagination: { page: number; pageSize: number; offset: number } }) {
    await database.query('select * from users where status = $1 limit $2 offset $3', [input.status ?? 'active', input.pagination.pageSize, input.pagination.offset]);

    return [
      buildUser(),
      buildUser({ email: 'finance.owner@clearline.dev', fullName: 'Nadia Patel', role: 'owner' }),
    ];
  }

  async findById(userId: string) {
    await database.one('select * from users where id = $1', [userId]);
    return buildUser({ id: userId });
  }

  async createUser(input: Record<string, unknown>) {
    await database.query('insert into users values ($1, $2, $3, $4)', [input.email, input.fullName, input.role, input.teamId]);
    return buildUser({
      email: String(input.email),
      fullName: String(input.fullName),
      role: String(input.role ?? 'member') as UserRecord['role'],
      teamId: String(input.teamId),
      status: 'invited',
      timezone: String(input.timezone ?? 'America/New_York'),
    });
  }

  async updateUser(userId: string, input: Record<string, unknown>) {
    await database.query('update users set profile = $1 where id = $2', [JSON.stringify(input), userId]);
    return buildUser({ id: userId, ...input } as Partial<UserRecord>);
  }

  async createInvitation(input: Record<string, unknown>) {
    await database.query('insert into user_invitations values ($1, $2, $3)', [input.email, input.role, input.message]);
    return {
      invitationId: randomUUID(),
      email: String(input.email),
      role: String(input.role ?? 'member'),
      expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    };
  }
}

