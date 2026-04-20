import { buildSlackRouter } from './slack.routes.js';
import { SlackController } from './slack.controller.js';
import { SlackService } from './slack.service.js';
import { SlackClient } from './slack.client.js';

export function createSlackModule() {
  const client = new SlackClient();
  const service = new SlackService(client);
  const controller = new SlackController(service);

  return {
    router: buildSlackRouter(controller),
  };
}
