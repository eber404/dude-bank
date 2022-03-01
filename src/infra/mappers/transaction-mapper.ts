import { Transaction } from 'domain/entities/transaction.ts';

import { TransactionDTO } from 'infra/dtos/transaction-dto.ts';

function fromDomain(transaction: Transaction): TransactionDTO {
  return {
    amount: transaction.amount,
    date: transaction.date.toDateString(),
    from: transaction.from,
    to: transaction.to,
    type: transaction.getTransactionType.toString(),
    description: transaction.description,
    id: transaction.id,
  };
}

function toDomain(transactionDTO: TransactionDTO): Transaction {
  return new Transaction({
    amount: transactionDTO.amount,
    date: new Date(transactionDTO.date),
    from: transactionDTO.from,
    to: transactionDTO.to,
    description: transactionDTO.description,
    id: transactionDTO.id,
  });
}

export const TransactionMapper = {
  fromDomain,
  toDomain,
};
