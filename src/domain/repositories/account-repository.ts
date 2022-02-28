import { Account } from 'domain/entities/account.ts';

export interface CreateAccountRepository {
  create(account: Account): Promise<void>;
}

export interface GetAccountRepository {
  getById(accountId: string): Promise<Account | null>;
}

export interface UpdateAccountRepository {
  update(id: string, account: Account): Promise<void>;
}
