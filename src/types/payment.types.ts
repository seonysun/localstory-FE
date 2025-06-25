export type Payment = {
  id: number;
  user: number;
  userEmail: string;
  merchantUid: string;
  amount: number;
  status: string;
  paymentMethod: string;
  cardName: string;
  cardNumber: string;
  paidAt: string;
  receiptUrl: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};
