import { asyncHandler } from '../../lib/asyncHandler.js';
import { created, ok } from '../../lib/http.js';
import type { InvoicingService } from './invoicing.service.js';

export class InvoicingController {
  constructor(private readonly service: InvoicingService) {}

  list = asyncHandler(async (req, res) => {
    ok(res, await this.service.listInvoices(req.user!));
  });

  create = asyncHandler(async (req, res) => {
    created(res, await this.service.createInvoice(req.body, req.user!));
  });

  finalize = asyncHandler(async (req, res) => {
    const invoiceId = Array.isArray(req.params.invoiceId)
      ? req.params.invoiceId[0]
      : req.params.invoiceId;
    ok(res, await this.service.finalizeInvoice(invoiceId, req.body, req.user!));
  });

  send = asyncHandler(async (req, res) => {
    const invoiceId = Array.isArray(req.params.invoiceId)
      ? req.params.invoiceId[0]
      : req.params.invoiceId;
    ok(res, await this.service.sendInvoice(invoiceId, req.body, req.user!));
  });
}
