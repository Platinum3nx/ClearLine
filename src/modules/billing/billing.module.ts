import { buildBillingRouter } from './billing.routes.js';
import { BillingController } from './billing.controller.js';
import { BillingRepository } from './billing.repository.js';
import { BillingService } from './billing.service.js';
import { TaxEngineClient } from './clients/tax-engine.client.js';

export function createBillingModule() {
  const repository = new BillingRepository();
  const taxEngineClient = new TaxEngineClient();
  const service = new BillingService(repository, taxEngineClient);
  const controller = new BillingController(service);

  return {
    router: buildBillingRouter(controller),
  };
}

