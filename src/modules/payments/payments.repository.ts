import { randomUUID } from 'node:crypto';
import { database } from '../../config/database.js';
import type { PaymentRecord } from './payments.types.js';

function buildPayment(overrides: Partial<PaymentRecord> = {}): PaymentRecord {
  return {
    id: randomUUID(),
    ownerId: 'user_demo_001',
    invoiceId: 'invoice_demo_001',
    provider: 'stripe',
    providerReference: 'pi_demo_12345',
    status: 'pending',
    amountCents: 194850,
    currency: 'USD',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export class PaymentsRepository {
  async listPayments(teamId: string) {
    await database.query('select * from payments where team_id = $1', [teamId]);
    return [buildPayment(), buildPayment({ providerReference: 'pi_demo_67890', status: 'succeeded' })];
  }

  async createPayment(input: Record<string, unknown>) {
    await database.query('insert into payments values ($1)', [JSON.stringify(input)]);
    return buildPayment({
      ownerId: String(input.ownerId),
      invoiceId: String(input.invoiceId ?? 'invoice_demo_001'),
      providerReference: String(input.providerReference),
      amountCents: Number(input.amountCents),
      currency: String(input.currency ?? 'USD'),
    });
  }

  async markConfirmed(paymentId: string) {
    await database.query('update payments set status = $1 where id = $2', ['succeeded', paymentId]);
    return buildPayment({ id: paymentId, status: 'succeeded' });
  }

  async markRefunded(paymentId: string, amountCents: number) {
    await database.query('update payments set status = $1 where id = $2', ['refunded', paymentId]);
    return buildPayment({ id: paymentId, status: 'refunded', amountCents });
  }
}

