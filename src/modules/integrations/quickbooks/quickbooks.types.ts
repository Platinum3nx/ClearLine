export interface QuickBooksConnectionResult {
  code: string;
  realmId: string;
  companyName: string;
}

export interface QuickBooksInvoicePushResult {
  invoiceId: string;
  customerName: string;
  totalCents: number;
  pushedAt: string;
}
