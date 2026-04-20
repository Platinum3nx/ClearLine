import { database } from '../../config/database.js';
import type { IntegrationConnectionRecord, IntegrationProvider } from './integrations.types.js';

function buildConnection(overrides: Partial<IntegrationConnectionRecord> = {}): IntegrationConnectionRecord {
  return {
    provider: 'slack',
    status: 'connected',
    teamId: 'team_demo_001',
    linkedAccountLabel: 'Northwind Workspace',
    scopes: ['channels:read', 'chat:write'],
    lastSyncAt: new Date().toISOString(),
    ...overrides,
  };
}

export class IntegrationsRepository {
  async listByTeam(teamId: string): Promise<IntegrationConnectionRecord[]> {
    await database.query('select * from integration_connections where team_id = $1', [teamId]);
    return [
      buildConnection({ teamId }),
      buildConnection({ provider: 'salesforce', linkedAccountLabel: 'Northwind CRM', scopes: ['api', 'refresh_token'] }),
      buildConnection({ provider: 'quickbooks', linkedAccountLabel: 'Northwind Books', scopes: ['com.intuit.quickbooks.accounting'] }),
    ];
  }

  async connect(provider: string, input: Record<string, unknown>): Promise<IntegrationConnectionRecord> {
    await database.query('insert into integration_connections values ($1)', [JSON.stringify(input)]);
    return buildConnection({
      provider: provider as IntegrationProvider,
      teamId: String(input.teamId),
      linkedAccountLabel: String(input.accountLabel ?? provider + ' account'),
      scopes: Array.isArray(input.scopes) ? input.scopes.map(String) : [],
    });
  }

  async disconnect(provider: string, teamId: string) {
    await database.query('update integration_connections set status = $1 where provider = $2 and team_id = $3', ['disconnected', provider, teamId]);
    return {
      provider,
      disconnected: true,
    };
  }

  async enqueueSync(provider: string, teamId: string) {
    await database.query('insert into integration_sync_jobs values ($1, $2)', [provider, teamId]);
    return {
      provider,
      teamId,
      jobId: 'sync_' + provider + '_' + teamId.slice(-4),
      queuedAt: new Date().toISOString(),
    };
  }
}
