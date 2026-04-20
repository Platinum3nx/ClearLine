import { publishDomainEvent } from '../../lib/domain-events.js';
import type { AuthenticatedPrincipal } from '../auth/auth.types.js';
import { INVOICE_EVENTS } from './events/invoice.events.js';
import { InvoicingRepository } from './invoicing.repository.js';
import { InvoicePdfRenderer } from './renderers/pdf-renderer.js';
import { presentInvoice } from './transformers/invoice.presenter.js';

export class InvoicingService {
  constructor(
    private readonly repository: InvoicingRepository,
    private readonly renderer: InvoicePdfRenderer,
  ) {}

  async listInvoices(actor: AuthenticatedPrincipal) {
    const invoices = await this.repository.listInvoices(actor.teamId);
    return invoices.map(presentInvoice);
  }

  async createInvoice(input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    const invoice = await this.repository.createInvoice({
      ...input,
      teamId: actor.teamId,
      ownerId: actor.id,
    });
    await publishDomainEvent(INVOICE_EVENTS.created, { actorId: actor.id, invoiceId: invoice.id });
    return presentInvoice(invoice);
  }

  async finalizeInvoice(invoiceId: string, input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    const invoice = await this.repository.finalizeInvoice(invoiceId, input);
    const pdfBuffer = await this.renderer.render(invoice);

    await publishDomainEvent(INVOICE_EVENTS.finalized, {
      actorId: actor.id,
      invoiceId,
      artifactBytes: pdfBuffer.byteLength,
    });

    return {
      invoice: presentInvoice(invoice),
      artifactBytes: pdfBuffer.byteLength,
    };
  }

  async sendInvoice(invoiceId: string, input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    const delivery = await this.repository.recordSend(invoiceId, input);
    await publishDomainEvent(INVOICE_EVENTS.sent, { actorId: actor.id, invoiceId, delivery });
    return delivery;
  }
}

