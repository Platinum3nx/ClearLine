export interface AdminAccountRecord {
  id: string;
  name: string;
  status: string;
  planCode: string;
}

export interface FeatureFlagRecord {
  key: string;
  enabled: boolean;
  description: string;
}
