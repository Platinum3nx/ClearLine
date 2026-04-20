import { createHmac } from 'node:crypto';

export class WebhookSigner {
  sign(payload: Record<string, unknown>, secret: string) {
    const timestamp = String(Math.floor(Date.now() / 1000));
    const body = JSON.stringify(payload);
    const digest = createHmac('sha256', secret).update(timestamp + '.' + body).digest('hex');

    return {
      'x-clearline-signature': digest,
      'x-clearline-timestamp': timestamp,
    };
  }
}
