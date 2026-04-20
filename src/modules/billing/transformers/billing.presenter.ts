import type { BillingPlan, SubscriptionRecord } from '../billing.types.js';

export function presentPlan(plan: BillingPlan) {
  return {
    code: plan.code,
    name: plan.name,
    amountCents: plan.amountCents,
    currency: plan.currency,
    interval: plan.interval,
    isCustom: plan.isCustom,
  };
}

export function presentSubscription(subscription: SubscriptionRecord) {
  return {
    id: subscription.id,
    teamId: subscription.teamId,
    planCode: subscription.planCode,
    status: subscription.status,
    seats: subscription.seats,
    renewalDate: subscription.renewalDate,
  };
}

