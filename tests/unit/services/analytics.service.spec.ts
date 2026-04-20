import { describe, expect, it } from 'vitest';
import { AnalyticsService } from '../../../src/modules/analytics/analytics.service.js';

describe('AnalyticsService', () => {
  it('queries metrics from the warehouse client', async () => {
    const repository = {} as any;
    const warehouseClient = { queryMetrics: async () => ({ range: '30d', values: [{ metricKey: 'mrr', value: 100 }] }) } as any;

    const service = new AnalyticsService(repository, warehouseClient);
    const result = await service.queryMetrics({ metricKeys: ['mrr'], range: '30d' }, { id: 'user_001', email: 'ops@clearline.dev', teamId: 'team_demo_001', roles: ['admin'] });

    expect(result.values[0].metricKey).toBe('mrr');
  });

  it('tracks analytics events', async () => {
    const repository = { trackEvent: async () => ({ eventName: 'invoice.sent', teamId: 'team_demo_001', actorId: 'user_001', recordedAt: new Date().toISOString() }) } as any;
    const warehouseClient = {} as any;

    const service = new AnalyticsService(repository, warehouseClient);
    const event = await service.trackEvent({ eventName: 'invoice.sent', source: 'api', properties: {} }, { id: 'user_001', email: 'ops@clearline.dev', teamId: 'team_demo_001', roles: ['admin'] });

    expect(event.eventName).toBe('invoice.sent');
  });
});

