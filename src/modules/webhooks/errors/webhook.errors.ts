import { AppError } from '../../../lib/errors.js';

export class WebhookReplayBlockedError extends AppError {
  constructor(deliveryId: string) {
    super(409, 'webhook_replay_blocked', 'Webhook delivery replay is blocked for ' + deliveryId);
  }
}
