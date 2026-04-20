import { buildQuickBooksRouter } from './quickbooks.routes.js';
import { QuickBooksController } from './quickbooks.controller.js';
import { QuickBooksService } from './quickbooks.service.js';
import { QuickBooksClient } from './quickbooks.client.js';

export function createQuickBooksModule() {
  const client = new QuickBooksClient();
  const service = new QuickBooksService(client);
  const controller = new QuickBooksController(service);

  return {
    router: buildQuickBooksRouter(controller),
  };
}
