export interface TransactionDTO {
  id: string;
  amount: number;
  description?: string;
  from: string;
  to: string;
  date: string;
  type: string;
}
