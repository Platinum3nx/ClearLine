import { z } from 'zod';

export const listIntegrationsQuerySchema = z.object({
  provider: z.enum(['slack', 'salesforce', 'quickbooks']).optional(),
  includeInactive: z.coerce.boolean().default(false),
});
