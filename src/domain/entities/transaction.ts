import { TransactionType } from 'domain/entities/enums/transaction-type.ts';
import { Amount } from 'domain/entities/value-objects/amount.ts';

export interface TransactionProps {
  id?: string;
  amount: number;
  description?: string;
  fromAccountId: string;
  toAccountId: string;
  date: Date;
}

export class Transaction {
  public readonly id: string;
  public readonly amount: number;
  public readonly description?: string;
  public readonly fromAccountId: string;
  public readonly toAccountId: string;
  public readonly date: Date;

  constructor(props: TransactionProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.amount = new Amount(props.amount).amount;
    this.description = props.description;
    this.fromAccountId = props.toAccountId;
    this.toAccountId = props.toAccountId;
    this.date = props.date;
  }

  public isValid() {
    return typeof this.amount === 'number' &&
      this.amount > 0 &&
      this.date;
  }

  public getTransactionType(senderAccountId: string): TransactionType {
    return senderAccountId === this.fromAccountId
      ? TransactionType.DEBIT
      : TransactionType.CREDIT;
  }
}
