import {Role} from './role.model';
import {Deserializable} from './Deserializable';

export class Person implements Deserializable{

  private _id: number | undefined;

  private _firstName: string | undefined;
  private _secondName: string | undefined;
  private _lastName: string | undefined;
  private _telephone: number | undefined;
  private _parentId: Person | undefined;
  private _email: string | undefined;
  private _birthDay: Date | undefined;
  private _userRoles!: Role[] ;
  private _password: string;
  private _username: string;
  private _degree: string | undefined;

  addRole(role: Role): void{
     this.userRoles.push(role);
  }
  removeRole(role: Role): void {
    this.userRoles.filter(r => r !== role);
  }

  constructor() {
    this._password = '1234';
    this._username = 'username';

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

  get lastName(): string | undefined {
    return this._lastName;
  }

  set lastName(value: string | undefined) {
    this._lastName = value;
  }

  get telephone(): number | undefined {
    return this._telephone;
  }

  set telephone(value: number | undefined) {
    this._telephone = value;
  }


  get degree(): string | undefined {
    return this._degree;
  }

  set degree(value: string | undefined) {
    this._degree = value;
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


  get userRoles(): Role[]  {
    return this._userRoles;
  }


  set userRoles(value: Role[]) {
    this._userRoles = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }


}
