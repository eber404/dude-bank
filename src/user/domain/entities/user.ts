import { Email } from 'user/domain/entities/value-objects/email.ts';
import { Name } from 'user/domain/entities/value-objects/name.ts';
import { Password } from 'user/domain/entities/value-objects/password.ts';

export type UserProps = Omit<User, 'isValid'>;

export class User {
  public readonly id?: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = new Name(props.name).name;
    this.email = new Email(props.email).email;
    this.password = new Password(props.password).password;
  }

  public isValid() {
    return this.name && this.email && this.password;
  }
}
