import { AppError } from '../../../lib/errors.js';

export class MetricQueryError extends AppError {
  constructor(metricKey: string) {
    super(422, 'metric_query_failed', 'Metric query failed for ' + metricKey);
  }
}
