import { z } from 'zod';

export const adminFeatureFlagSchema = z.object({
  enabled: z.boolean(),
  description: z.string().max(200).default(''),
});
