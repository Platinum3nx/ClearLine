import { describe, expect, it } from 'vitest';
import { AdminService } from '../../../src/modules/admin/admin.service.js';

describe('AdminService', () => {
  it('searches accounts', async () => {
    const repository = { searchAccounts: async () => [{ id: 'acct_demo_001', name: 'Northwind Operations', status: 'active', planCode: 'growth-monthly' }] } as any;

    const service = new AdminService(repository);
    const result = await service.searchAccounts({ query: 'northwind' }, { id: 'user_001', email: 'ops@clearline.dev', teamId: 'team_demo_001', roles: ['admin'] });

    expect(result.count).toBe(1);
  });

  it('updates feature flags', async () => {
    const repository = { updateFeatureFlag: async () => ({ key: 'billing.rollouts', enabled: true, description: 'Enabled for growth accounts' }) } as any;

    const service = new AdminService(repository);
    const flag = await service.updateFeatureFlag('billing.rollouts', { enabled: true, description: 'Enabled for growth accounts' }, { id: 'user_001', email: 'ops@clearline.dev', teamId: 'team_demo_001', roles: ['admin'] });

    expect(flag.enabled).toBe(true);
  });
});

