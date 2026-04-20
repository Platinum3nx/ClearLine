import { QuickBooksClient } from './quickbooks.client.js';

export class QuickBooksService {
  constructor(private readonly client: QuickBooksClient) {}

  async completeCallback(code: string, realmId: string) {
    return this.client.exchangeCode(code, realmId);
  }

  async pushInvoice(input: Record<string, unknown>) {
    return this.client.pushInvoice({
      invoiceId: String(input.invoiceId),
      customerName: String(input.customerName),
      totalCents: Number(input.totalCents),
    });
  }
}
