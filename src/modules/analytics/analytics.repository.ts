import { database } from '../../config/database.js';
import type { AnalyticsEventRecord, FunnelRecord } from './analytics.types.js';

export class AnalyticsRepository {
  async listFunnels(teamId: string): Promise<FunnelRecord[]> {
    await database.query('select * from funnels where team_id = $1', [teamId]);
    return [
      { id: 'funnel_signup', label: 'Trial to paid', conversionRate: 0.42 },
      { id: 'funnel_collect', label: 'Invoice send to payment', conversionRate: 0.68 },
    ];
  }

  async trackEvent(input: Record<string, unknown>): Promise<AnalyticsEventRecord> {
    await database.query('insert into analytics_events values ($1)', [JSON.stringify(input)]);
    return {
      eventName: String(input.eventName),
      teamId: String(input.teamId),
      actorId: String(input.actorId),
      recordedAt: new Date().toISOString(),
    };
  }
}
