import { analyticsEventSchema } from '../schemas/analytics.schema.js';

export const trackEventRequestSchema = analyticsEventSchema.pick({
  eventName: true,
  source: true,
  properties: true,
});
