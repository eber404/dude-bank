import { ErrorMessages } from 'domain/validation/error-messages.ts';
import {
  Notification,
  NotificationType,
} from 'domain/singletons/notification.ts';

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
