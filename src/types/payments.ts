export interface FeeItem {
  id: string;
  feeTitle: string;
  category: string;
  year: string;
  term: string;
  amount: number;
  discount: number;
  netAmount: number;
  paid: number;
  remaining: number;
  dueDate: string;
  status: 'Unpaid' | 'Paid' | 'Partial';
  paymentDate?: string;
  receiptNumber?: string;
}

export interface PaymentSummary {
  totalFees: number;
  feeCount: number;
  discount: number;
  totalPaid: number;
  balanceDue: number;
}
