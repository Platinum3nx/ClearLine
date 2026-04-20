import { SlackClient } from './slack.client.js';

export class SlackService {
  constructor(private readonly client: SlackClient) {}

  async completeCallback(code: string) {
    return this.client.exchangeCode(code);
  }

  async postChannelMessage(input: Record<string, unknown>) {
    return this.client.postMessage(String(input.channelId), String(input.text));
  }
}
