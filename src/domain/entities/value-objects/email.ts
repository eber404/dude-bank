export class Email {
  public readonly _email!: string;

  constructor(email: string) {
    const isValid = this.validate(email);

    if (isValid) {
      this._email = email;
    } else {
      // notification
    }
  }

  public get email() {
    return this._email;
  }

  private validate(email: string): boolean {
    var tester =
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
    var [account, address] = email.split('@');
    if (account.length > 64) {
      return false;
    }
    var domainParts = address.split('.');
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
