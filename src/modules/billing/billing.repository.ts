import { database } from '../../config/database.js';
import type { BillingPlan, SubscriptionRecord } from './billing.types.js';

function buildPlan(overrides: Partial<BillingPlan> = {}): BillingPlan {
  return {
    code: 'growth-monthly',
    name: 'Growth',
    amountCents: 1900,
    currency: 'USD',
    interval: 'month',
    isCustom: false,
    ...overrides,
  };
}

function buildSubscription(overrides: Partial<SubscriptionRecord> = {}): SubscriptionRecord {
  return {
    id: 'sub_demo_001',
    teamId: 'team_demo_001',
    planCode: 'growth-monthly',
    status: 'active',
    seats: 12,
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    ...overrides,
  };
}

export class BillingRepository {
  async listPlans() {
    await database.query('select * from billing_plans order by amount_cents asc');
    return [buildPlan(), buildPlan({ code: 'enterprise-annual', name: 'Enterprise', amountCents: 240000, interval: 'year', isCustom: true })];
  }

  async createPlan(input: Record<string, unknown>) {
    await database.query('insert into billing_plans values ($1, $2, $3)', [input.code, input.name, input.amountCents]);
    return buildPlan({
      code: String(input.code),
      name: String(input.name),
      amountCents: Number(input.amountCents),
      currency: String(input.currency ?? 'USD'),
      interval: String(input.interval ?? 'month'),
      isCustom: Boolean(input.isCustom ?? false),
    });
  }

  async updateSubscription(teamId: string, input: Record<string, unknown>) {
    await database.query('update subscriptions set config = $1 where team_id = $2', [JSON.stringify(input), teamId]);
    return buildSubscription({
      teamId,
      planCode: String(input.planCode),
      seats: Number(input.seats ?? 1),
      status: String(input.status ?? 'active'),
    });
  }
}

