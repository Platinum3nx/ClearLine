export class TaxEngineClient {
  async previewTax(input: { countryCode: string; amountCents: number }) {
    const taxRate = input.countryCode === 'US' ? 0.0825 : 0.15;
    return {
      taxCents: Math.round(input.amountCents * taxRate),
      provider: 'demo-tax-engine',
    };
  }
}

