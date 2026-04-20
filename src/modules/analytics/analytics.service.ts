import { publishDomainEvent } from '../../lib/domain-events.js';
import type { AuthenticatedPrincipal } from '../auth/auth.types.js';
import { ANALYTICS_EVENTS } from './events/analytics.events.js';
import { assertAnalyticsAccess } from './policies/analytics-access.policy.js';
import { AnalyticsRepository } from './analytics.repository.js';
import { presentFunnels, presentMetricQuery } from './transformers/analytics.presenter.js';
import { WarehouseClient } from './clients/warehouse.client.js';

export class AnalyticsService {
  constructor(
    private readonly repository: AnalyticsRepository,
    private readonly warehouseClient: WarehouseClient,
  ) {}

  async queryMetrics(input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    assertAnalyticsAccess(actor.roles);
    const metrics = await this.warehouseClient.queryMetrics({
      teamId: actor.teamId,
      metricKeys: Array.isArray(input.metricKeys) ? input.metricKeys.map(String) : [],
      range: String(input.range ?? '30d'),
    });

    return presentMetricQuery(metrics);
  }

  async listFunnels(_query: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    assertAnalyticsAccess(actor.roles);
    const funnels = await this.repository.listFunnels(actor.teamId);
    return presentFunnels(funnels);
  }

  async trackEvent(input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    const event = await this.repository.trackEvent({
      ...input,
      teamId: actor.teamId,
      actorId: actor.id,
    });
    await publishDomainEvent(ANALYTICS_EVENTS.eventTracked, { actorId: actor.id, eventName: event.eventName });

    return event;
  }
}
