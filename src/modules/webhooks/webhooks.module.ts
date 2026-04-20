import { buildWebhooksRouter } from './webhooks.routes.js';
import { WebhooksController } from './webhooks.controller.js';
import { WebhooksRepository } from './webhooks.repository.js';
import { WebhooksService } from './webhooks.service.js';
import { WebhookSigner } from './signers/webhook.signer.js';

export function createWebhooksModule() {
  const repository = new WebhooksRepository();
  const signer = new WebhookSigner();
  const service = new WebhooksService(repository, signer);
  const controller = new WebhooksController(service);

  return {
    router: buildWebhooksRouter(controller),
  };
}
