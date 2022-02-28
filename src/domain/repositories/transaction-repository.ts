import { Transaction } from 'domain/entities/transaction.ts';

export interface CreateTransactionRepository {
  create(input: Transaction): Promise<void>;
}
