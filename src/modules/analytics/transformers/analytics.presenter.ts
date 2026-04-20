import type { FunnelRecord, MetricQueryResult } from '../analytics.types.js';

export function presentMetricQuery(result: MetricQueryResult) {
  return result;
}

export function presentFunnels(funnels: FunnelRecord[]) {
  return {
    items: funnels,
    generatedAt: new Date().toISOString(),
  };
}
