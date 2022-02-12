export interface MakeTransactionDTO {
  amount: number;
  description?: string;
  fromAccountId: string;
  toAccountId: string;
}
