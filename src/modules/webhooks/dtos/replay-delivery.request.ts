import { z } from 'zod';

export const replayDeliveryRequestSchema = z.object({
  reason: z.string().min(4).max(160),
  replayImmediately: z.boolean().default(true),
});
