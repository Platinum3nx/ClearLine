import { SlackClient } from '../modules/integrations/slack/slack.client.js';
import { SlackService } from '../modules/integrations/slack/slack.service.js';

export async function runSlackSyncWorker() {
  const service = new SlackService(new SlackClient());
  await service.postChannelMessage({
    channelId: 'ops-alerts',
    text: 'Nightly sync summary is ready.',
  });
}
