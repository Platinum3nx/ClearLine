import { QuickBooksClient } from '../modules/integrations/quickbooks/quickbooks.client.js';
import { QuickBooksService } from '../modules/integrations/quickbooks/quickbooks.service.js';

export async function runQuickBooksSyncWorker() {
  const service = new QuickBooksService(new QuickBooksClient());
  await service.pushInvoice({
    invoiceId: 'invoice_demo_001',
    customerName: 'Northwind Operations',
    totalCents: 194850,
  });
}
