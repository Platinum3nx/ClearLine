import { publishDomainEvent } from '../../lib/domain-events.js';
import { normalizePagination } from '../../lib/pagination.js';
import type { AuthenticatedPrincipal } from '../auth/auth.types.js';
import { WEBHOOK_EVENTS } from './events/webhook.events.js';
import { assertWebhookSignatureConfig } from './policies/webhook-signature.policy.js';
import { WebhooksRepository } from './webhooks.repository.js';
import { WebhookSigner } from './signers/webhook.signer.js';
import { presentDeliveryList, presentEndpoint } from './transformers/webhook.presenter.js';

export class WebhooksService {
  constructor(
    private readonly repository: WebhooksRepository,
    private readonly signer: WebhookSigner,
  ) {}

  async listEndpoints(actor: AuthenticatedPrincipal) {
    const endpoints = await this.repository.listEndpoints(actor.teamId);
    return endpoints.map(presentEndpoint);
  }

  async registerEndpoint(input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    assertWebhookSignatureConfig(input);
    const endpoint = await this.repository.createEndpoint({
      ...input,
      teamId: actor.teamId,
      secretVersion: 'v1',
    });
    await publishDomainEvent(WEBHOOK_EVENTS.endpointRegistered, { actorId: actor.id, endpointId: endpoint.id });
    return presentEndpoint(endpoint);
  }

  async pingEndpoint(endpointId: string, actor: AuthenticatedPrincipal) {
    const endpoint = await this.repository.findEndpointById(endpointId);
    const payload = { type: 'webhooks.ping', endpointId, sentAt: new Date().toISOString() };
    const signatureHeaders = this.signer.sign(payload, endpoint.signingSecret);

    await publishDomainEvent(WEBHOOK_EVENTS.deliveryQueued, { actorId: actor.id, endpointId });

    return {
      endpoint: presentEndpoint(endpoint),
      signatureHeaders,
    };
  }

  async listDeliveries(query: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    const pagination = normalizePagination({
      page: Number(query.page ?? 1),
      pageSize: Number(query.pageSize ?? 25),
    });
    const deliveries = await this.repository.listDeliveries(actor.teamId, pagination);

    return presentDeliveryList(deliveries);
  }

  async replayDelivery(deliveryId: string, input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    const replay = await this.repository.replayDelivery(deliveryId, input);
    await publishDomainEvent(WEBHOOK_EVENTS.deliveryReplayed, { actorId: actor.id, deliveryId, replayReason: input.reason });
    return replay;
  }
}
