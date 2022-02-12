import {
  Notification,
  NotificationType,
} from 'common/domain/singletons/notification.ts';

import { ErrorMessages } from 'common/domain/validation/error-messages.ts';

export class Password {
  private _password!: string;

  constructor(password: string) {
    const isValid = this.validate(password);

    if (isValid) {
      this._password = password;
    } else {
      Notification.add({
        message: ErrorMessages.INVALID_PASSWORD,
        type: NotificationType.ERROR,
      });
    }
  }

  public get password() {
    return this._password;
  }

  private validate(password: string): boolean {
    return password.trim().length >= 8 && !password.match(' ');
  }
}
