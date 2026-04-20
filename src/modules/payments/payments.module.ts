import { buildPaymentsRouter } from './payments.routes.js';
import { PaymentsController } from './payments.controller.js';
import { PaymentsRepository } from './payments.repository.js';
import { PaymentsService } from './payments.service.js';
import { StripeGateway } from './gateways/stripe.gateway.js';

export function createPaymentsModule() {
  const repository = new PaymentsRepository();
  const gateway = new StripeGateway();
  const service = new PaymentsService(repository, gateway);
  const controller = new PaymentsController(service);

  return {
    router: buildPaymentsRouter(controller),
  };
}

