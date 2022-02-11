import { Name } from './value-objects/name.ts';

export class User {
  public readonly name!: string;
  public readonly email!: string;
  public readonly password!: string;

  constructor(props: User) {
    this.name = new Name(props.name).name;
  }
}
