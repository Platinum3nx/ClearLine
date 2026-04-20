import { describe, expect, it } from 'vitest';
import { IntegrationsService } from '../../../src/modules/integrations/integrations.service.js';

describe('IntegrationsService', () => {
  it('lists integration connections', async () => {
    const repository = { listByTeam: async () => [{ provider: 'slack', status: 'connected', teamId: 'team_demo_001', linkedAccountLabel: 'Northwind Workspace', scopes: ['chat:write'], lastSyncAt: new Date().toISOString() }] } as any;

    const service = new IntegrationsService(repository);
    const integrations = await service.listIntegrations({}, { id: 'user_001', email: 'ops@clearline.dev', teamId: 'team_demo_001', roles: ['admin'] });

    expect(integrations[0].provider).toBe('slack');
  });

  it('connects a provider', async () => {
    const repository = { connect: async () => ({ provider: 'salesforce', status: 'connected', teamId: 'team_demo_001', linkedAccountLabel: 'Northwind CRM', scopes: ['api'], lastSyncAt: new Date().toISOString() }) } as any;

    const service = new IntegrationsService(repository);
    const connection = await service.connect('salesforce', { scopes: ['api'] }, { id: 'user_001', email: 'ops@clearline.dev', teamId: 'team_demo_001', roles: ['admin'] });

    expect(connection.provider).toBe('salesforce');
  });
});

