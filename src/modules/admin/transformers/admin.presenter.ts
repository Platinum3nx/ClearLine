import type { AdminAccountRecord, FeatureFlagRecord } from '../admin.types.js';

export function presentAccountSearch(accounts: AdminAccountRecord[]) {
  return {
    items: accounts,
    count: accounts.length,
  };
}

export function presentFeatureFlag(flag: FeatureFlagRecord) {
  return flag;
}
