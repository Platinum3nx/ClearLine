import { describe, expect, it } from 'vitest';
import { AuthService } from '../../../src/modules/auth/auth.service.js';

describe('AuthService', () => {
  it('issues a session for valid credentials', async () => {
    const repository = {
      findUserByEmail: async (email: string) => ({ id: 'user_auth_001', email, teamId: 'team_demo_001', roles: ['owner'] }),
      storeRefreshSession: async () => undefined,
    } as any;

    const service = new AuthService(repository);
    const session = await service.login({ email: 'owner@clearline.dev', password: 'StrongPassword123' });

    expect(session.user.email).toBe('owner@clearline.dev');
    expect(session.accessToken).toBeTypeOf('string');
    expect(session.refreshToken).toBeTypeOf('string');
  });

  it('returns the current profile', async () => {
    const repository = {
      findUserById: async (id: string) => ({ id, email: 'owner@clearline.dev', teamId: 'team_demo_001', roles: ['owner'] }),
    } as any;

    const service = new AuthService(repository);
    const profile = await service.getCurrentProfile({ id: 'user_auth_001', email: 'owner@clearline.dev', teamId: 'team_demo_001', roles: ['owner'] });

    expect(profile.email).toBe('owner@clearline.dev');
  });
});

