import { describe, expect, it } from 'vitest';
import { SalesforceService } from '../../../src/modules/integrations/salesforce/salesforce.service.js';

describe('SalesforceService', () => {
  it('completes Salesforce callbacks', async () => {
    const client = { exchangeCode: async (code: string) => ({ organizationId: '00Ddemo', instanceUrl: 'https://northwind.my.salesforce.com', code }) } as any;
    const service = new SalesforceService(client);
    const result = await service.completeCallback('oauth-code');

    expect(result.organizationId).toBe('00Ddemo');
  });

  it('syncs account payloads', async () => {
    const client = { upsertAccount: async (input: { externalAccountId: string; accountName: string }) => ({ ...input, syncedAt: new Date().toISOString() }) } as any;
    const service = new SalesforceService(client);
    const result = await service.syncAccount({ externalAccountId: 'acct_demo_001', accountName: 'Northwind Operations' });

    expect(result.externalAccountId).toBe('acct_demo_001');
  });
});

