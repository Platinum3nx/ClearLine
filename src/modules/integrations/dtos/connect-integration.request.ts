import { integrationConnectionSchema } from '../schemas/integration.schema.js';

export const connectIntegrationRequestSchema = integrationConnectionSchema.pick({
  provider: true,
  scopes: true,
});
