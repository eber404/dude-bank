import {
  Notification,
  NotificationType,
} from 'common/domain/singletons/notification.ts';
import { ErrorMessages } from 'common/domain/validation/error-messages.ts';

export class Name {
  private _name!: string;

  constructor(name: string) {
    const isValid = this.validate(name);

    if (isValid) {
      this._name = name;
    } else {
      Notification.add({
        message: ErrorMessages.INVALID_NAME,
        type: NotificationType.ERROR,
      });
    }
  }

  public get name() {
    return this._name;
  }

  private validate(name: string): boolean {
    return !!name && (name.trim().length >= 3 && name.trim().length <= 255);
  }
}
