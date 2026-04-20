import { describe, expect, it } from 'vitest';
import { TeamsService } from '../../../src/modules/teams/teams.service.js';

describe('TeamsService', () => {
  it('lists teams for the actor scope', async () => {
    const repository = {
      listTeams: async () => [{ id: 'team_001', name: 'Northwind Operations', slug: 'northwind-ops', seatLimit: 25, seatCount: 12, defaultCurrency: 'USD', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }],
    } as any;

    const service = new TeamsService(repository);
    const result = await service.listTeams({ page: 1, pageSize: 10 });

    expect(result[0].slug).toBe('northwind-ops');
  });

  it('creates a new team', async () => {
    const repository = {
      createTeam: async () => ({ id: 'team_002', name: 'Blue Mesa', slug: 'blue-mesa', seatLimit: 5, seatCount: 0, defaultCurrency: 'USD', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }),
    } as any;

    const service = new TeamsService(repository);
    const team = await service.createTeam({ name: 'Blue Mesa', slug: 'blue-mesa' }, { id: 'actor_001', email: 'owner@clearline.dev', teamId: 'team_demo_001', roles: ['owner'] });

    expect(team.slug).toBe('blue-mesa');
  });
});

