import { Account } from 'domain/entities/account.ts';
import { UpdateAccountRepository } from 'domain/repositories/account-repository.ts';

import { Collection } from 'infra/data/collection.ts';
import { LocalStorage } from 'infra/data/local-storage.ts';

export class UpdateAccountRepositoryLocal implements UpdateAccountRepository {
  async update(id: string, account: Account): Promise<void> {
    await LocalStorage.update(Collection.ACCOUNTS, id, account);
  }
}
