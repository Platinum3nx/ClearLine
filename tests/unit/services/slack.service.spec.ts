import { describe, expect, it } from 'vitest';
import { SlackService } from '../../../src/modules/integrations/slack/slack.service.js';

describe('SlackService', () => {
  it('completes OAuth callbacks', async () => {
    const client = { exchangeCode: async (code: string) => ({ workspaceId: 'T123', workspaceName: 'Northwind Workspace', code }) } as any;
    const service = new SlackService(client);
    const result = await service.completeCallback('oauth-code');

    expect(result.workspaceId).toBe('T123');
  });

  it('posts channel messages', async () => {
    const client = { postMessage: async (channelId: string, text: string) => ({ channelId, text, sentAt: new Date().toISOString() }) } as any;
    const service = new SlackService(client);
    const result = await service.postChannelMessage({ channelId: 'ops-alerts', text: 'Nightly summary ready' });

    expect(result.channelId).toBe('ops-alerts');
  });
});

