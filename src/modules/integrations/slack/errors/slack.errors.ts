import { AppError } from '../../../../lib/errors.js';

export class SlackChannelPostError extends AppError {
  constructor(channelId: string) {
    super(409, 'slack_channel_post_failed', 'Slack message failed for channel ' + channelId);
  }
}
