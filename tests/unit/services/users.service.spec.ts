import { describe, expect, it } from 'vitest';
import { UsersService } from '../../../src/modules/users/users.service.js';

describe('UsersService', () => {
  it('lists presented users', async () => {
    const repository = {
      listUsers: async () => [{ id: 'user_001', email: 'ops@clearline.dev', fullName: 'Ops Lead', status: 'active', role: 'admin', teamId: 'team_demo_001', timezone: 'America/New_York', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }],
    } as any;

    const service = new UsersService(repository);
    const users = await service.listUsers({ page: 1, pageSize: 25 });

    expect(users).toHaveLength(1);
    expect(users[0].email).toBe('ops@clearline.dev');
  });

  it('creates a new invited user', async () => {
    const repository = {
      createUser: async () => ({ id: 'user_002', email: 'finance@clearline.dev', fullName: 'Finance Lead', status: 'invited', role: 'member', teamId: 'team_demo_001', timezone: 'America/New_York', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }),
    } as any;

    const service = new UsersService(repository);
    const user = await service.createUser({ email: 'finance@clearline.dev', fullName: 'Finance Lead', role: 'member', teamId: 'team_demo_001' }, { id: 'actor_001', email: 'owner@clearline.dev', teamId: 'team_demo_001', roles: ['owner'] });

    expect(user.status).toBe('invited');
  });
});

