import { Account } from 'domain/entities/account.ts';

import { AccountDTO } from 'infra/dtos/account-dto.ts';

function fromDomain(account: Account): AccountDTO {
  return {
    balance: account.balance,
    id: account.id,
    transactions: account.transactions.map((transaction) => transaction.id),
  };
}

function toDomain(accountDTO: AccountDTO): Account {
  return new Account({
    balance: accountDTO.balance,
    id: accountDTO.id,
  });
}

export const AccountMapper = {
  fromDomain,
  toDomain,
};
