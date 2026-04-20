import type { SlackConnectionResult } from './slack.types.js';

export class SlackClient {
  async exchangeCode(code: string): Promise<SlackConnectionResult> {
    return {
      workspaceId: 'T123456',
      workspaceName: 'Northwind Workspace',
      code,
    };
  }

  async postMessage(channelId: string, text: string) {
    return {
      channelId,
      text,
      sentAt: new Date().toISOString(),
    };
  }
}
