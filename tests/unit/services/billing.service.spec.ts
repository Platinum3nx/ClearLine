import { describe, expect, it } from 'vitest';
import { BillingService } from '../../../src/modules/billing/billing.service.js';

describe('BillingService', () => {
  it('lists plans', async () => {
    const repository = {
      listPlans: async () => [{ code: 'growth-monthly', name: 'Growth', amountCents: 1900, currency: 'USD', interval: 'month', isCustom: false }],
    } as any;
    const taxEngineClient = { previewTax: async () => ({ taxCents: 123, provider: 'demo-tax-engine' }) } as any;

    const service = new BillingService(repository, taxEngineClient);
    const plans = await service.listPlans();

    expect(plans[0].code).toBe('growth-monthly');
  });

  it('builds an upgrade preview', async () => {
    const repository = {} as any;
    const taxEngineClient = { previewTax: async () => ({ taxCents: 157, provider: 'demo-tax-engine' }) } as any;

    const service = new BillingService(repository, taxEngineClient);
    const preview = await service.previewUpgrade({ currentPlanCode: 'growth-monthly', requestedPlanCode: 'enterprise-annual', seatDelta: 2 }, { id: 'actor_001', email: 'owner@clearline.dev', teamId: 'team_demo_001', roles: ['owner'] });

    expect(preview.estimatedTaxCents).toBe(157);
  });
});

