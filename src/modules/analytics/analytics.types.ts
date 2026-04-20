export interface FunnelRecord {
  id: string;
  label: string;
  conversionRate: number;
}

export interface AnalyticsEventRecord {
  eventName: string;
  teamId: string;
  actorId: string;
  recordedAt: string;
}

export interface MetricQueryResult {
  range: string;
  values: Array<{ metricKey: string; value: number }>;
}
