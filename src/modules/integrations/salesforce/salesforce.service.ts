import { SalesforceClient } from './salesforce.client.js';

export class SalesforceService {
  constructor(private readonly client: SalesforceClient) {}

  async completeCallback(code: string) {
    return this.client.exchangeCode(code);
  }

  async syncAccount(input: Record<string, unknown>) {
    return this.client.upsertAccount({
      externalAccountId: String(input.externalAccountId),
      accountName: String(input.accountName),
    });
  }
}
