import { Email } from 'domain/entities/value-objects/email.ts';
import { Name } from 'domain/entities/value-objects/name.ts';
import { Password } from 'domain/entities/value-objects/password.ts';
import { Account } from 'domain/entities/account.ts';

interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  account?: Account;
}

export class User {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly account: Account;

  constructor(props: UserProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.name = new Name(props.name).name;
    this.email = new Email(props.email).email;
    this.password = new Password(props.password).password;
    this.account = props.account ?? new Account({
      balance: 1000,
      userId: this.id,
    });
  }

  public isValid() {
    return this.name && this.email && this.password;
  }
}
