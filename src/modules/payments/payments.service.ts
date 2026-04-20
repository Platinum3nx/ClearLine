import { publishDomainEvent } from '../../lib/domain-events.js';
import type { AuthenticatedPrincipal } from '../auth/auth.types.js';
import { PAYMENT_EVENTS } from './events/payment.events.js';
import { StripeGateway } from './gateways/stripe.gateway.js';
import { PaymentsRepository } from './payments.repository.js';
import { presentPayment } from './transformers/payment.presenter.js';

export class PaymentsService {
  constructor(
    private readonly repository: PaymentsRepository,
    private readonly gateway: StripeGateway,
  ) {}

  async listPayments(actor: AuthenticatedPrincipal) {
    const payments = await this.repository.listPayments(actor.teamId);
    return payments.map(presentPayment);
  }

  async createPaymentIntent(input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    const gatewayIntent = await this.gateway.createIntent({
      amountCents: Number(input.amountCents),
      currency: String(input.currency ?? 'USD'),
      customerReference: actor.teamId,
    });

    const payment = await this.repository.createPayment({
      invoiceId: input.invoiceId,
      ownerId: actor.id,
      providerReference: gatewayIntent.providerReference,
      amountCents: Number(input.amountCents),
      currency: String(input.currency ?? 'USD'),
    });

    await publishDomainEvent(PAYMENT_EVENTS.intentCreated, { actorId: actor.id, paymentId: payment.id });
    return presentPayment(payment);
  }

  async confirmPayment(paymentId: string, input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    await this.gateway.confirmIntent(String(input.providerReference ?? paymentId));
    const payment = await this.repository.markConfirmed(paymentId);
    await publishDomainEvent(PAYMENT_EVENTS.confirmed, { actorId: actor.id, paymentId });
    return presentPayment(payment);
  }

  async refundPayment(paymentId: string, input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    await this.gateway.refund(String(input.providerReference ?? paymentId), Number(input.amountCents));
    const payment = await this.repository.markRefunded(paymentId, Number(input.amountCents));
    await publishDomainEvent(PAYMENT_EVENTS.refunded, { actorId: actor.id, paymentId });
    return presentPayment(payment);
  }
}

