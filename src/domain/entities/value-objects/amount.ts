import { ErrorMessages } from 'domain/validation/error-messages.ts';
import {
  Notification,
  NotificationType,
} from 'domain/singletons/notification.ts';

export class Amount {
  private readonly _amount!: number;

  constructor(amount: number) {
    const isBalanceValid = this.validate(amount);

    if (isBalanceValid) {
      this._amount = amount;
    } else {
      Notification.add({
        type: NotificationType.ERROR,
        message: ErrorMessages.INVALID_AMOUNT,
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
