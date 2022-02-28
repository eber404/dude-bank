import {
  Notification,
  NotificationType,
} from 'domain/singletons/notification.ts';
import { Amount } from 'domain/entities/value-objects/amount.ts';

import { Transaction } from './transaction.ts';

export interface AccountProps {
  id?: string;
  balance: number;
  transactions?: Transaction[];
}

export class Account {
  public readonly id: string;
  public readonly transactions: Transaction[];

  private _balance!: number;

  constructor(props: AccountProps) {
    this.id = props.id ?? crypto.randomUUID();
    this._balance = new Amount(props.balance).amount;
    this.transactions = props.transactions ?? [];
  }

  get balance() {
    return this._balance;
  }

  public isValid() {
    return this._balance >= 0;
  }

  public addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
  }

  public withdraw(amount: number) {
    if (this._balance < amount) {
      return Notification.add({
        message: `Not enough balance`,
        type: NotificationType.ERROR,
      });
    }

    this._balance -= amount;
  }

  public deposit(amount: number) {
    this._balance += amount;
  }
}
