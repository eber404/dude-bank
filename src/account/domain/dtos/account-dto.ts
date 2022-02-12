import { UserDTO } from 'user/domain/entities/user-dto.ts';
import { TransactionDTO } from './transaction-dto.ts';

export interface AccountDTO {
  id: string;
  user: UserDTO;
  balance: number;
  transactions?: TransactionDTO[];
}
