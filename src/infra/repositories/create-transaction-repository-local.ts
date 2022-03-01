import { Collection } from 'infra/data/collection.ts';
import { LocalStorage } from 'infra/data/local-storage.ts';
import { TransactionMapper } from 'infra/mappers/transaction-mapper.ts';

import { Transaction } from 'domain/entities/transaction.ts';

export class CreateTransactionRepositoryLocal
  implements CreateTransactionRepositoryLocal {
  async create(transaction: Transaction): Promise<void> {
    const transactionDto = TransactionMapper.fromDomain(transaction);

    await LocalStorage.add(Collection.TRANSACTIONS, transactionDto);
  }
}
