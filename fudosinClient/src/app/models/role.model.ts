import {Deserializable} from './Deserializable';

export class Role implements Deserializable {
  private _id: number | undefined;
  private _name: string | undefined;

  constructor() {
  }

  get id(): number | undefined {
    return this._id;
  }

  set id(value: number | undefined) {
    this._id = value;
  }

  get name(): string | undefined {
    return this._name;
  }

  set name(value: string | undefined) {
    this._name = value;
  }

  deserialize(input: any): any {
    Object.assign(this, input);
    return this;
  }
}
