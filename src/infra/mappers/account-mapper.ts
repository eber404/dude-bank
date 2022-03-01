import { Account } from 'domain/entities/account.ts';

import { AccountDTO } from 'infra/dtos/account-dto.ts';

function fromDomain(account: Account): AccountDTO {
  return {
    balance: account.balance,
    id: account.id,
    transactions: account.transactions.map((transaction) => transaction.id),
    userId: account.userId,
  };
}

function toDomain(accountDTO: AccountDTO): Account {
  return new Account({
    balance: accountDTO.balance,
    id: accountDTO.id,
    userId: accountDTO.userId,
  });
}

export const AccountMapper = {
  fromDomain,
  toDomain,
};
