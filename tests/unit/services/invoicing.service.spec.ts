import { describe, expect, it } from 'vitest';
import { InvoicingService } from '../../../src/modules/invoicing/invoicing.service.js';

describe('InvoicingService', () => {
  it('lists invoices', async () => {
    const repository = {
      listInvoices: async () => [{ id: 'invoice_001', teamId: 'team_demo_001', ownerId: 'user_001', invoiceNumber: 'INV-10027', status: 'draft', currency: 'USD', subtotalCents: 180000, taxCents: 14850, totalCents: 194850, dueDate: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }],
    } as any;
    const renderer = { render: async () => Buffer.from('pdf') } as any;

    const service = new InvoicingService(repository, renderer);
    const invoices = await service.listInvoices({ id: 'user_001', email: 'ops@clearline.dev', teamId: 'team_demo_001', roles: ['admin'] });

    expect(invoices[0].invoiceNumber).toBe('INV-10027');
  });

  it('finalizes invoices and returns artifact metadata', async () => {
    const repository = {
      finalizeInvoice: async () => ({ id: 'invoice_001', teamId: 'team_demo_001', ownerId: 'user_001', invoiceNumber: 'INV-10027', status: 'finalized', currency: 'USD', subtotalCents: 180000, taxCents: 14850, totalCents: 194850, dueDate: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }),
    } as any;
    const renderer = { render: async () => Buffer.from('pdf-bytes') } as any;

    const service = new InvoicingService(repository, renderer);
    const result = await service.finalizeInvoice('invoice_001', {}, { id: 'user_001', email: 'ops@clearline.dev', teamId: 'team_demo_001', roles: ['admin'] });

    expect(result.invoice.status).toBe('finalized');
    expect(result.artifactBytes).toBeGreaterThan(0);
  });
});

