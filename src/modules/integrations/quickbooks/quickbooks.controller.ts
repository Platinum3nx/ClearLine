import { created, ok } from '../../../lib/http.js';
import { asyncHandler } from '../../../lib/asyncHandler.js';
import type { QuickBooksService } from './quickbooks.service.js';

export class QuickBooksController {
  constructor(private readonly service: QuickBooksService) {}

  completeCallback = asyncHandler(async (req, res) => {
    ok(res, await this.service.completeCallback(String(req.query.code ?? 'demo-code'), String(req.query.realmId ?? 'realm-demo')));
  });

  pushInvoice = asyncHandler(async (req, res) => {
    created(res, await this.service.pushInvoice(req.body));
  });
}
