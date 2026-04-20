import type { SalesforceAccountResult, SalesforceConnectionResult } from './salesforce.types.js';

export class SalesforceClient {
  async exchangeCode(code: string): Promise<SalesforceConnectionResult> {
    return {
      organizationId: '00Ddemo',
      instanceUrl: 'https://northwind.my.salesforce.com',
      code,
    };
  }

  async upsertAccount(input: { externalAccountId: string; accountName: string }): Promise<SalesforceAccountResult> {
    return {
      externalAccountId: input.externalAccountId,
      accountName: input.accountName,
      syncedAt: new Date().toISOString(),
    };
  }
}
