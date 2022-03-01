import { TransactionType } from 'domain/entities/enums/transaction-type.ts';
import { Amount } from 'domain/entities/value-objects/amount.ts';

export interface TransactionProps {
  id?: string;
  amount: number;
  description?: string;
  from: string;
  to: string;
  date: Date;
}

export class Transaction {
  public readonly id: string;
  public readonly amount: number;
  public readonly description?: string;
  public readonly from: string;
  public readonly to: string;
  public readonly date: Date;

  constructor(props: TransactionProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.amount = new Amount(props.amount).amount;
    this.description = props.description;
    this.from = props.to;
    this.to = props.to;
    this.date = props.date;
  }

  public isValid() {
    return typeof this.amount === 'number' &&
      this.amount > 0 &&
      this.date;
  }

  public getTransactionType(senderAccountId: string): TransactionType {
    return senderAccountId === this.from
      ? TransactionType.DEBIT
      : TransactionType.CREDIT;
  }
}
