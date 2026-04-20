import type { WebhookDeliveryRecord, WebhookEndpointRecord } from '../webhooks.types.js';

export function presentEndpoint(endpoint: WebhookEndpointRecord) {
  return {
    id: endpoint.id,
    url: endpoint.url,
    status: endpoint.status,
    subscribedEvents: endpoint.subscribedEvents,
    lastDeliveryStatus: endpoint.lastDeliveryStatus,
    secretVersion: endpoint.secretVersion,
  };
}

export function presentDeliveryList(deliveries: WebhookDeliveryRecord[]) {
  return {
    items: deliveries.map((delivery) => ({
      id: delivery.id,
      endpointId: delivery.endpointId,
      eventName: delivery.eventName,
      status: delivery.status,
      attemptCount: delivery.attemptCount,
      responseCode: delivery.responseCode,
    })),
  };
}
