export interface WebhookEndpointRecord {
  id: string;
  teamId: string;
  url: string;
  status: string;
  subscribedEvents: string[];
  signingSecret: string;
  secretVersion: string;
  lastDeliveryStatus: string;
  createdAt: string;
}

export interface WebhookDeliveryRecord {
  id: string;
  endpointId: string;
  eventName: string;
  status: string;
  attemptCount: number;
  responseCode: number;
  createdAt: string;
}
