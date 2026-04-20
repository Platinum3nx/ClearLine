export function toMinorUnits(amount: number) {
  return Math.round(amount * 100);
}

export function fromMinorUnits(amountCents: number) {
  return Number((amountCents / 100).toFixed(2));
}

export function formatCurrency(amountCents: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(fromMinorUnits(amountCents));
}

