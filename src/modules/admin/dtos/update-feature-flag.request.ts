import { adminFeatureFlagSchema } from '../schemas/admin.schema.js';

export const updateFeatureFlagRequestSchema = adminFeatureFlagSchema.pick({
  enabled: true,
  description: true,
});
