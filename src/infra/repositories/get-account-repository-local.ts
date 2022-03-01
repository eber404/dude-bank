import { Account } from 'domain/entities/account.ts';
import { GetAccountRepository } from 'domain/repositories/account-repository.ts';

import { Collection } from 'infra/data/collection.ts';
import { LocalStorage } from 'infra/data/local-storage.ts';
import { AccountMapper } from 'infra/mappers/account-mapper.ts';
import { AccountDTO } from 'infra/dtos/account-dto.ts';

export class GetAccountRepositoryLocal implements GetAccountRepository {
  async getById(id: string): Promise<Account | null> {
    const accountDTO = await LocalStorage.getBy<AccountDTO>(
      Collection.ACCOUNTS,
      'id',
      id,
    );

    if (!accountDTO) return null;

    return AccountMapper.toDomain(accountDTO);
  }
}
