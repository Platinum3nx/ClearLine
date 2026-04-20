export class StripeGateway {
  async createIntent(input: { amountCents: number; currency: string; customerReference: string }) {
    return {
      providerReference: 'pi_demo_' + Math.abs(input.amountCents),
      clientSecret: 'seti_demo_secret',
      currency: input.currency,
    };
  }

  async confirmIntent(providerReference: string) {
    return {
      providerReference,
      status: 'succeeded',
    };
  }

  async refund(providerReference: string, amountCents: number) {
    return {
      providerReference,
      refundedAmountCents: amountCents,
      status: 'succeeded',
    };
  }
}

