export interface PaymentRecord {
  id: string;
  ownerId: string;
  invoiceId: string;
  provider: string;
  providerReference: string;
  status: string;
  amountCents: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

