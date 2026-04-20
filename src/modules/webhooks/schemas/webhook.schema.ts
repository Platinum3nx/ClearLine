import { z } from 'zod';

export const webhookEndpointSchema = z.object({
  url: z.string().url(),
  subscribedEvents: z.array(z.string()).min(1),
  secretVersion: z.enum(['v1', 'v2']).default('v1'),
});
