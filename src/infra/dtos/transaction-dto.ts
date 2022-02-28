export interface TransactionDTO {
  id: string;
  amount: number;
  description?: string;
  fromAccountId: string;
  toAccountId: string;
  date: string;
  type: string;
}
