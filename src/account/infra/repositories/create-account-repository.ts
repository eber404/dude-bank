import { Collection } from 'common/infra/data/collection.ts';
import { LocalStorage } from 'common/infra/data/local-storage.ts';

import { Account } from 'account/domain/entities/account.ts';
import { CreateAccountRepository } from 'account/domain/repositories/account-repository.ts';

import { AccountDTO } from 'account/infra/dtos/account-dto.ts';

export class CreateAccountRepositoryLocal implements CreateAccountRepository {
  async create(account: Account): Promise<void> {
    const accountDto = new AccountDTO(account);

    await LocalStorage.add(Collection.ACCOUNTS, accountDto);
  }
}
