import { AccountDTO } from './account-dto.ts';

export interface TransactionDTO {
  id: string;
  amount: number;
  description?: string;
  from: AccountDTO;
  to: AccountDTO;
  date: Date;
  type: string;
}
