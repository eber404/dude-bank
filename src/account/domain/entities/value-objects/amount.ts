import {
  Notification,
  NotificationType,
} from 'common/domain/singletons/notification.ts';

export class Amount {
  private readonly _amount!: number;

  constructor(amount: number) {
    const isBalanceValid = this.validate(amount);

    if (isBalanceValid) {
      this._amount = amount;
    } else {
      Notification.add({
        type: NotificationType.ERROR,
        message: 'Amount cannot be negative',
      });
    }
  }

  public get amount(): number {
    return this._amount;
  }

  private validate(amount: number): boolean {
    return amount >= 0;
  }
}
