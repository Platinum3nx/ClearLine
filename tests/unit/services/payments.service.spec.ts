import { describe, expect, it } from 'vitest';
import { PaymentsService } from '../../../src/modules/payments/payments.service.js';

describe('PaymentsService', () => {
  it('creates payment intents', async () => {
    const repository = {
      createPayment: async () => ({ id: 'payment_001', ownerId: 'user_001', invoiceId: 'invoice_001', provider: 'stripe', providerReference: 'pi_demo_1000', status: 'pending', amountCents: 1000, currency: 'USD', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }),
    } as any;
    const gateway = { createIntent: async () => ({ providerReference: 'pi_demo_1000', clientSecret: 'secret', currency: 'USD' }) } as any;

    const service = new PaymentsService(repository, gateway);
    const payment = await service.createPaymentIntent({ invoiceId: 'invoice_001', amountCents: 1000, currency: 'USD' }, { id: 'user_001', email: 'ops@clearline.dev', teamId: 'team_demo_001', roles: ['admin'] });

    expect(payment.providerReference).toBe('pi_demo_1000');
  });

  it('confirms payments', async () => {
    const repository = { markConfirmed: async () => ({ id: 'payment_001', ownerId: 'user_001', invoiceId: 'invoice_001', provider: 'stripe', providerReference: 'pi_demo_1000', status: 'succeeded', amountCents: 1000, currency: 'USD', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }) } as any;
    const gateway = { confirmIntent: async () => ({ status: 'succeeded' }) } as any;

    const service = new PaymentsService(repository, gateway);
    const result = await service.confirmPayment('payment_001', { providerReference: 'pi_demo_1000' }, { id: 'user_001', email: 'ops@clearline.dev', teamId: 'team_demo_001', roles: ['admin'] });

    expect(result.status).toBe('succeeded');
  });
});

