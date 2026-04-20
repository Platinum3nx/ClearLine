import { buildInvoicingRouter } from './invoicing.routes.js';
import { InvoicingController } from './invoicing.controller.js';
import { InvoicingRepository } from './invoicing.repository.js';
import { InvoicingService } from './invoicing.service.js';
import { InvoicePdfRenderer } from './renderers/pdf-renderer.js';

export function createInvoicingModule() {
  const repository = new InvoicingRepository();
  const renderer = new InvoicePdfRenderer();
  const service = new InvoicingService(repository, renderer);
  const controller = new InvoicingController(service);

  return {
    router: buildInvoicingRouter(controller),
  };
}

