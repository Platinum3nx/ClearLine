import { publishDomainEvent } from '../../lib/domain-events.js';
import type { AuthenticatedPrincipal } from '../auth/auth.types.js';
import { TaxEngineClient } from './clients/tax-engine.client.js';
import { BILLING_EVENTS } from './events/billing.events.js';
import { ensureEntitledToBilling } from './policies/billing-entitlement.policy.js';
import { BillingRepository } from './billing.repository.js';
import { presentPlan, presentSubscription } from './transformers/billing.presenter.js';

export class BillingService {
  constructor(
    private readonly repository: BillingRepository,
    private readonly taxEngineClient: TaxEngineClient,
  ) {}

  async listPlans() {
    const plans = await this.repository.listPlans();
    return plans.map(presentPlan);
  }

  async createPlan(input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    ensureEntitledToBilling(actor.roles);
    const plan = await this.repository.createPlan(input);
    await publishDomainEvent(BILLING_EVENTS.planCreated, { actorId: actor.id, planCode: plan.code });
    return presentPlan(plan);
  }

  async updateSubscription(input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    ensureEntitledToBilling(actor.roles);
    const subscription = await this.repository.updateSubscription(actor.teamId, input);
    await publishDomainEvent(BILLING_EVENTS.subscriptionUpdated, { actorId: actor.id, teamId: actor.teamId });
    return presentSubscription(subscription);
  }

  async previewUpgrade(input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    ensureEntitledToBilling(actor.roles);
    const taxPreview = await this.taxEngineClient.previewTax({
      countryCode: String(input.countryCode ?? 'US'),
      amountCents: Number(input.seatDelta ?? 0) * 1900,
    });

    return {
      currentPlanCode: String(input.currentPlanCode),
      requestedPlanCode: String(input.requestedPlanCode),
      estimatedSubtotalCents: Number(input.seatDelta ?? 0) * 1900,
      estimatedTaxCents: taxPreview.taxCents,
      estimatedTotalCents: Number(input.seatDelta ?? 0) * 1900 + taxPreview.taxCents,
    };
  }
}

