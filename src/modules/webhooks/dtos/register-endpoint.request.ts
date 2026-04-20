import { webhookEndpointSchema } from '../schemas/webhook.schema.js';

export const registerEndpointRequestSchema = webhookEndpointSchema.pick({
  url: true,
  subscribedEvents: true,
});
