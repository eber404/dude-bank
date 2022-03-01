import { Account } from 'domain/entities/account.ts';
import { CreateAccountRepository } from 'domain/repositories/account-repository.ts';

import { Collection } from 'infra/data/collection.ts';
import { LocalStorage } from 'infra/data/local-storage.ts';
import { AccountMapper } from 'infra/mappers/account-mapper.ts';

export class CreateAccountRepositoryLocal implements CreateAccountRepository {
  async create(account: Account): Promise<void> {
    const accountDTO = AccountMapper.fromDomain(account);

    await LocalStorage.add(Collection.ACCOUNTS, accountDTO);
  }
}
