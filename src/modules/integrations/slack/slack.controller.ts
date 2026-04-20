import { created, ok } from '../../../lib/http.js';
import { asyncHandler } from '../../../lib/asyncHandler.js';
import type { SlackService } from './slack.service.js';

export class SlackController {
  constructor(private readonly service: SlackService) {}

  completeCallback = asyncHandler(async (req, res) => {
    ok(res, await this.service.completeCallback(String(req.query.code ?? 'demo-code')));
  });

  postMessage = asyncHandler(async (req, res) => {
    created(res, await this.service.postChannelMessage(req.body));
  });
}
