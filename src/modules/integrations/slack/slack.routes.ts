import { Router } from 'express';
import { integrationSyncRateLimiter, publicRateLimiter } from '../../../middleware/rateLimiter.js';
import { validate } from '../../../middleware/validate.js';
import type { SlackController } from './slack.controller.js';
import { postChannelMessageRequestSchema } from './dtos/post-channel-message.request.js';

export function buildSlackRouter(controller: SlackController) {
  const router = Router();

  router.get('/callback', publicRateLimiter, controller.completeCallback);
  router.post('/messages', integrationSyncRateLimiter, validate(postChannelMessageRequestSchema), controller.postMessage);

  return router;
}
