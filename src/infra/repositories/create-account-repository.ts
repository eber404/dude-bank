import { Collection } from 'infra/data/collection.ts';
import { LocalStorage } from 'infra/data/local-storage.ts';

import { Account } from 'domain/entities/account.ts';
import { CreateAccountRepository } from 'domain/repositories/account-repository.ts';

import { AccountDTO } from 'infra/dtos/account-dto.ts';

export class CreateAccountRepositoryLocal implements CreateAccountRepository {
  async create(account: Account): Promise<void> {
    const accountDto = new AccountDTO(account);

    await LocalStorage.add(Collection.ACCOUNTS, accountDto);
  }
}
