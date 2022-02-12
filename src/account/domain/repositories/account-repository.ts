import { Transaction } from 'account/domain/entities/transaction.ts';
import { Account } from 'account/domain/entities/account.ts';

export interface CreateTransactionRepository {
  create(input: Transaction): Promise<void>;
}

export interface GetAccountRepository {
  getById(accountId: string): Promise<Account | null>;
}

export interface UpdateAccountRepository {
  update(account: Account): Promise<void>;
}
