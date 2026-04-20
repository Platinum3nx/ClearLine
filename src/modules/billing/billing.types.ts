export interface BillingPlan {
  code: string;
  name: string;
  amountCents: number;
  currency: string;
  interval: string;
  isCustom: boolean;
}

export interface SubscriptionRecord {
  id: string;
  teamId: string;
  planCode: string;
  status: string;
  seats: number;
  renewalDate: string;
}

