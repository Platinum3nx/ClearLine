import { AppError } from '../../../lib/errors.js';

export function assertWebhookSignatureConfig(input: Record<string, unknown>) {
  const secretVersion = String(input.secretVersion ?? 'v1');

  if (secretVersion !== 'v1' && secretVersion !== 'v2') {
    throw new AppError(422, 'invalid_webhook_secret_version', 'Webhook secret version is not supported');
  }
}
