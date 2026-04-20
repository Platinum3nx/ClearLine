import type { MetricQueryResult } from '../analytics.types.js';

export class WarehouseClient {
  async queryMetrics(input: { teamId: string; metricKeys: string[]; range: string }): Promise<MetricQueryResult> {
    return {
      range: input.range,
      values: input.metricKeys.map((metricKey, index) => ({
        metricKey,
        value: 100 + index * 14,
      })),
    };
  }
}
