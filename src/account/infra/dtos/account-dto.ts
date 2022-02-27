import { Account } from 'account/domain/entities/account.ts';

export class AccountDTO {
  id: string;
  userId: string;
  balance: number;
  transactions?: string[];

  constructor(props: Account) {
    this.id = props.id;
    this.userId = props.user.id;
    this.balance = props.balance;
    this.transactions = props.transactions.map((transaction) => transaction.id);
  }
}
