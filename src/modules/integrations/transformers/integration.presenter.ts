import type { IntegrationConnectionRecord } from '../integrations.types.js';

export function presentIntegration(integration: IntegrationConnectionRecord) {
  return {
    provider: integration.provider,
    status: integration.status,
    linkedAccountLabel: integration.linkedAccountLabel,
    scopes: integration.scopes,
    lastSyncAt: integration.lastSyncAt,
  };
}
