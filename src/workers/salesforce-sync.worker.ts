import { SalesforceClient } from '../modules/integrations/salesforce/salesforce.client.js';
import { SalesforceService } from '../modules/integrations/salesforce/salesforce.service.js';

export async function runSalesforceSyncWorker() {
  const service = new SalesforceService(new SalesforceClient());
  await service.syncAccount({
    externalAccountId: 'acct_demo_001',
    accountName: 'Northwind Operations',
  });
}
