import type { QuickBooksConnectionResult, QuickBooksInvoicePushResult } from './quickbooks.types.js';

export class QuickBooksClient {
  async exchangeCode(code: string, realmId: string): Promise<QuickBooksConnectionResult> {
    return {
      code,
      realmId,
      companyName: 'Northwind Books',
    };
  }

  async pushInvoice(input: { invoiceId: string; customerName: string; totalCents: number }): Promise<QuickBooksInvoicePushResult> {
    return {
      invoiceId: input.invoiceId,
      customerName: input.customerName,
      pushedAt: new Date().toISOString(),
      totalCents: input.totalCents,
    };
  }
}
