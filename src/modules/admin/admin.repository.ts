import { database } from '../../config/database.js';
import type { AdminAccountRecord, FeatureFlagRecord } from './admin.types.js';

export class AdminRepository {
  async searchAccounts(input: { query: string; status?: string }): Promise<AdminAccountRecord[]> {
    await database.query('select * from admin_accounts where status = $1', [input.status ?? 'active']);
    return [
      { id: 'acct_demo_001', name: 'Northwind Operations', status: 'active', planCode: 'growth-monthly' },
      { id: 'acct_demo_002', name: 'Blue Mesa Holdings', status: 'past_due', planCode: 'enterprise-annual' },
    ];
  }

  async updateFeatureFlag(flagKey: string, input: Record<string, unknown>): Promise<FeatureFlagRecord> {
    await database.query('update feature_flags set config = $1 where key = $2', [JSON.stringify(input), flagKey]);
    return {
      key: flagKey,
      enabled: Boolean(input.enabled),
      description: String(input.description ?? 'Updated by admin route'),
    };
  }

  async createImpersonationSession(input: Record<string, unknown>) {
    await database.query('insert into impersonation_sessions values ($1)', [JSON.stringify(input)]);
    return {
      targetUserId: String(input.targetUserId),
      sessionTokenPreview: 'imp_' + String(input.targetUserId).slice(0, 6),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    };
  }
}
