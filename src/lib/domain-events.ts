import { logger } from '../config/logger.js';

export interface DomainEvent<TPayload = unknown> {
  name: string;
  payload: TPayload;
  occurredAt: string;
}

export async function publishDomainEvent<TPayload>(name: string, payload: TPayload) {
  const event: DomainEvent<TPayload> = {
    name,
    payload,
    occurredAt: new Date().toISOString(),
  };

  logger.info({ event }, 'domain event published');
  return event;
}

