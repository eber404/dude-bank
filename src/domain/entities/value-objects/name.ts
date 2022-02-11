export class Name {
  private _name!: string;

  constructor(name: string) {
    const isValid = this.validate(name);

    if (isValid) {
      this._name = name;
    } else {
    }
  }

  public get name() {
    return this._name;
  }

  private validate(name: string): boolean {
    return !name || name.trim().length < 3 || name.trim().length > 255;
  }
}
