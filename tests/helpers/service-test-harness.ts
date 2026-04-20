export function createActor(overrides: Partial<{ id: string; email: string; teamId: string; roles: string[] }> = {}) {
  return {
    id: 'actor_001',
    email: 'owner@clearline.dev',
    teamId: 'team_demo_001',
    roles: ['owner'],
    ...overrides,
  };
}

