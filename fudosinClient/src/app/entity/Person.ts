import {Role} from "./Role";

export class Person {
  private _id: number | undefined;
  private _firstName: string | undefined;
  private _secondName: string | undefined;
  private _LastName: string | undefined;
  private _telephone: number | undefined;
  private _parentId: Person | undefined;
  private _email: string | undefined;
  private _birthDay: Date | undefined;
  private _roles: Role[] | undefined;
  private _userPassword: string;


  constructor() {
    this._userPassword = "1234";

  }

  get id(): number | undefined {
    return this._id;
  }

  set id(value: number | undefined) {
    this._id = value;
  }

  get firstName(): string | undefined {
    return this._firstName;
  }

  set firstName(value: string | undefined) {
    this._firstName = value;
  }

  get secondName(): string | undefined {
    return this._secondName;
  }

  set secondName(value: string | undefined) {
    this._secondName = value;
  }

  get LastName(): string | undefined {
    return this._LastName;
  }

  set LastName(value: string | undefined) {
    this._LastName = value;
  }

  get telephone(): number | undefined {
    return this._telephone;
  }

  set telephone(value: number | undefined) {
    this._telephone = value;
  }

  get parentId(): Person | undefined {
    return this._parentId;
  }

  set parentId(value: Person | undefined) {
    this._parentId = value;
  }

  get email(): string | undefined {
    return this._email;
  }

  set email(value: string | undefined) {
    this._email = value;
  }

  get birthDay(): Date | undefined {
    return this._birthDay;
  }

  set birthDay(value: Date | undefined) {
    this._birthDay = value;
  }


  get roles(): Role[] | undefined {
    return this._roles;
  }

  set roles(value: Role[] | undefined) {
    this._roles = value;
  }

  get userPassword(): string {
    return this._userPassword;
  }

  set userPassword(value: string) {
    this._userPassword = value;
  }
}
