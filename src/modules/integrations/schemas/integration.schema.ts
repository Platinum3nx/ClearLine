import { z } from 'zod';

export const integrationConnectionSchema = z.object({
  provider: z.enum(['slack', 'salesforce', 'quickbooks']),
  scopes: z.array(z.string()).default([]),
  status: z.enum(['connected', 'disconnected', 'errored']).default('connected'),
});
