import { describe, expect, it } from 'vitest';
import { WebhooksService } from '../../../src/modules/webhooks/webhooks.service.js';

describe('WebhooksService', () => {
  it('registers webhook endpoints', async () => {
    const repository = { createEndpoint: async () => ({ id: 'endpoint_001', teamId: 'team_demo_001', url: 'https://example.com/webhooks/clearline', status: 'active', subscribedEvents: ['invoice.sent'], signingSecret: 'whsec_demo_secret', secretVersion: 'v1', lastDeliveryStatus: 'delivered', createdAt: new Date().toISOString() }) } as any;
    const signer = { sign: () => ({ 'x-clearline-signature': 'sig', 'x-clearline-timestamp': '1234' }) } as any;

    const service = new WebhooksService(repository, signer);
    const endpoint = await service.registerEndpoint({ url: 'https://example.com/webhooks/clearline', subscribedEvents: ['invoice.sent'] }, { id: 'user_001', email: 'ops@clearline.dev', teamId: 'team_demo_001', roles: ['admin'] });

    expect(endpoint.url).toContain('example.com');
  });

  it('pings endpoints with signed headers', async () => {
    const repository = { findEndpointById: async () => ({ id: 'endpoint_001', teamId: 'team_demo_001', url: 'https://example.com/webhooks/clearline', status: 'active', subscribedEvents: ['invoice.sent'], signingSecret: 'whsec_demo_secret', secretVersion: 'v1', lastDeliveryStatus: 'delivered', createdAt: new Date().toISOString() }) } as any;
    const signer = { sign: () => ({ 'x-clearline-signature': 'sig', 'x-clearline-timestamp': '1234' }) } as any;

    const service = new WebhooksService(repository, signer);
    const result = await service.pingEndpoint('endpoint_001', { id: 'user_001', email: 'ops@clearline.dev', teamId: 'team_demo_001', roles: ['admin'] });

    expect(result.signatureHeaders['x-clearline-signature']).toBe('sig');
  });
});

