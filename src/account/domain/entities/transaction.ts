import { EnumHelper } from 'common/domain/utils/enum-helper.ts';

import { TransactionType } from 'account/domain/entities/enums/transaction-type.ts';
import { Amount } from 'account/domain/entities/value-objects/amount.ts';

import { Account } from './account.ts';

export interface TransactionProps {
  id?: string;
  amount: number;
  description?: string;
  from: Account;
  to: Account;
  date: Date;
  type: string;
}

export class Transaction {
  public readonly id?: string;
  public readonly amount: number;
  public readonly description?: string;
  public readonly from: Account;
  public readonly to: Account;
  public readonly date: Date;
  public readonly type: TransactionType;

  constructor(props: TransactionProps) {
    this.id = props.id;
    this.amount = new Amount(props.amount).amount;
    this.description = props.description;
    this.from = props.from;
    this.to = props.to;
    this.date = props.date;
    this.type = EnumHelper.toEnum(TransactionType, props.type);
  }

  public isValid() {
    return typeof this.amount === 'number' &&
      this.amount > 0 &&
      this.date &&
      this.type;
  }
}
