export interface InvoiceRecord {
  id: string;
  teamId: string;
  ownerId: string;
  invoiceNumber: string;
  status: string;
  currency: string;
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

