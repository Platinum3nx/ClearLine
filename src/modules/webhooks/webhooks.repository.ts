import { randomUUID } from 'node:crypto';
import { database } from '../../config/database.js';
import type { WebhookDeliveryRecord, WebhookEndpointRecord } from './webhooks.types.js';

function buildEndpoint(overrides: Partial<WebhookEndpointRecord> = {}): WebhookEndpointRecord {
  return {
    id: randomUUID(),
    teamId: 'team_demo_001',
    url: 'https://example.com/webhooks/clearline',
    status: 'active',
    subscribedEvents: ['invoice.sent', 'payment.confirmed'],
    signingSecret: 'whsec_demo_secret',
    secretVersion: 'v1',
    lastDeliveryStatus: 'delivered',
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

function buildDelivery(overrides: Partial<WebhookDeliveryRecord> = {}): WebhookDeliveryRecord {
  return {
    id: randomUUID(),
    endpointId: 'endpoint_demo_001',
    eventName: 'invoice.sent',
    status: 'delivered',
    attemptCount: 1,
    responseCode: 200,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

export class WebhooksRepository {
  async listEndpoints(teamId: string) {
    await database.query('select * from webhook_endpoints where team_id = $1', [teamId]);
    return [buildEndpoint(), buildEndpoint({ status: 'paused', lastDeliveryStatus: 'failed' })];
  }

  async createEndpoint(input: Record<string, unknown>) {
    await database.query('insert into webhook_endpoints values ($1)', [JSON.stringify(input)]);
    return buildEndpoint({
      teamId: String(input.teamId),
      url: String(input.url),
      subscribedEvents: Array.isArray(input.subscribedEvents) ? input.subscribedEvents.map(String) : [],
      secretVersion: String(input.secretVersion ?? 'v1'),
    });
  }

  async findEndpointById(endpointId: string) {
    await database.one('select * from webhook_endpoints where id = $1', [endpointId]);
    return buildEndpoint({ id: endpointId });
  }

  async listDeliveries(teamId: string, pagination: { pageSize: number; offset: number }) {
    await database.query('select * from webhook_deliveries where team_id = $1 limit $2 offset $3', [teamId, pagination.pageSize, pagination.offset]);
    return [buildDelivery(), buildDelivery({ eventName: 'payment.failed', status: 'failed', responseCode: 500, attemptCount: 3 })];
  }

  async replayDelivery(deliveryId: string, input: Record<string, unknown>) {
    await database.query('insert into webhook_delivery_replays values ($1, $2)', [deliveryId, JSON.stringify(input)]);
    return {
      deliveryId,
      requeued: true,
      replayedAt: new Date().toISOString(),
    };
  }
}
