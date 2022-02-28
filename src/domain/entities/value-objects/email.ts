import { ErrorMessages } from 'domain/validation/error-messages.ts';
import {
  Notification,
  NotificationType,
} from 'domain/singletons/notification.ts';

export class Email {
  public readonly _email!: string;

  constructor(email: string) {
    const isValid = this.validate(email);

    if (isValid) {
      this._email = email;
    } else {
      Notification.add({
        message: ErrorMessages.INVALID_EMAIL,
        type: NotificationType.ERROR,
      });
    }
  }

  public get email() {
    return this._email;
  }

  private validate(email: string): boolean {
    const tester =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email) {
      return false;
    }
    if (email.length > 256) {
      return false;
    }
    if (!tester.test(email)) {
      return false;
    }
    const [account, address] = email.split('@');
    if (account.length > 64) {
      return false;
    }
    const domainParts = address.split('.');
    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    ) {
      return false;
    }
    return true;
  }
}
