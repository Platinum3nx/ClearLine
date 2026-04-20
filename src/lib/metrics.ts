const counters = new Map<string, number>();

export function incrementMetric(metric: string, value = 1) {
  counters.set(metric, (counters.get(metric) ?? 0) + value);
  return counters.get(metric) ?? 0;
}

export function getMetric(metric: string) {
  return counters.get(metric) ?? 0;
}

