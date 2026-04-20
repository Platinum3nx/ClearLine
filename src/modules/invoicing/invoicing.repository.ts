import { randomUUID } from 'node:crypto';
import { database } from '../../config/database.js';
import type { InvoiceRecord } from './invoicing.types.js';

function buildInvoice(overrides: Partial<InvoiceRecord> = {}): InvoiceRecord {
  return {
    id: randomUUID(),
    teamId: 'team_demo_001',
    ownerId: 'user_demo_001',
    invoiceNumber: 'INV-10027',
    status: 'draft',
    currency: 'USD',
    subtotalCents: 180000,
    taxCents: 14850,
    totalCents: 194850,
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export class InvoicingRepository {
  async listInvoices(teamId: string) {
    await database.query('select * from invoices where team_id = $1 order by created_at desc', [teamId]);
    return [buildInvoice(), buildInvoice({ invoiceNumber: 'INV-10028', status: 'sent' })];
  }

  async createInvoice(input: Record<string, unknown>) {
    await database.query('insert into invoices values ($1)', [JSON.stringify(input)]);
    return buildInvoice({
      teamId: String(input.teamId),
      ownerId: String(input.ownerId),
      currency: String(input.currency ?? 'USD'),
      subtotalCents: Number(input.subtotalCents),
      taxCents: Number(input.taxCents ?? 0),
      totalCents: Number(input.totalCents),
      dueDate: String(input.dueDate),
    });
  }

  async finalizeInvoice(invoiceId: string, input: Record<string, unknown>) {
    await database.query('update invoices set finalized_at = now(), metadata = $1 where id = $2', [JSON.stringify(input), invoiceId]);
    return buildInvoice({ id: invoiceId, status: 'finalized' });
  }

  async recordSend(invoiceId: string, input: Record<string, unknown>) {
    await database.query('insert into invoice_deliveries values ($1, $2)', [invoiceId, JSON.stringify(input)]);
    return {
      invoiceId,
      channel: String(input.channel ?? 'email'),
      recipients: Array.isArray(input.recipients) ? input.recipients : [],
      queuedAt: new Date().toISOString(),
    };
  }
}

