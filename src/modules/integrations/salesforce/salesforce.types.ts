export interface SalesforceConnectionResult {
  organizationId: string;
  instanceUrl: string;
  code: string;
}

export interface SalesforceAccountResult {
  externalAccountId: string;
  accountName: string;
  syncedAt: string;
}
