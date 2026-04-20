export type IntegrationProvider = 'slack' | 'salesforce' | 'quickbooks';

export interface IntegrationConnectionRecord {
  provider: IntegrationProvider;
  status: string;
  teamId: string;
  linkedAccountLabel: string;
  scopes: string[];
  lastSyncAt: string;
}
