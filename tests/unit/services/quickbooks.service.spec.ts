import { describe, expect, it } from 'vitest';
import { QuickBooksService } from '../../../src/modules/integrations/quickbooks/quickbooks.service.js';

describe('QuickBooksService', () => {
  it('completes Intuit callbacks', async () => {
    const client = { exchangeCode: async (code: string, realmId: string) => ({ code, realmId, companyName: 'Northwind Books' }) } as any;
    const service = new QuickBooksService(client);
    const result = await service.completeCallback('oauth-code', 'realm-demo');

    expect(result.realmId).toBe('realm-demo');
  });

  it('pushes invoices to QuickBooks', async () => {
    const client = { pushInvoice: async (input: { invoiceId: string; customerName: string; totalCents: number }) => ({ ...input, pushedAt: new Date().toISOString() }) } as any;
    const service = new QuickBooksService(client);
    const result = await service.pushInvoice({ invoiceId: 'invoice_001', customerName: 'Northwind Operations', totalCents: 194850 });

    expect(result.invoiceId).toBe('invoice_001');
  });
});

