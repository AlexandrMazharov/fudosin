import {Time} from './Time.fudoshin.model';

export class Lesson {

  private _isPresent: boolean;
  private _paymentStatus: boolean;
  private _timeBegin: Time;
  private _timeEnd: Time;
  private _place: string;
  private _title: string;
  private _idStudent: number;

  private isPresentTypes = [
    'да', 'был'
  ];

  private paymentStatusTypes = [
    'оплачено', 'деньги'
  ];

  constructor(isPresent: string | boolean, paymentStatus: string | boolean, timeBegin: string, timeEnd: string, place: string, title: string, idStudent: number) {
    if (typeof isPresent === 'boolean') {
      this._isPresent = isPresent;
    } else {
      this._isPresent = false;
      for (let present of this.isPresentTypes) {
        if (isPresent.toLowerCase().includes(present)) {
          this._isPresent = true;
        }
      }
    }

    if (typeof paymentStatus === 'boolean') {
      this._paymentStatus = paymentStatus;
    } else {
      this._paymentStatus = false;
      for (let pay of this.paymentStatusTypes) {
        if (paymentStatus.toLowerCase().includes(pay)) {
          this._paymentStatus = true;
        }
      }
    }

    this._timeBegin = new Time(timeBegin);
    this._timeEnd = new Time(timeEnd);
    this._place = place;
    this._title = title;
    this._idStudent = idStudent;
  }

  get isPresent(): boolean {
    return this._isPresent;
  }

  get paymentStatus(): boolean {
    return this._paymentStatus;
  }

  get timeBegin(): Time {
    return this._timeBegin;
  }

  get timeEnd(): Time {
    return this._timeEnd;
  }

  get place(): string {
    return this._place;
  }

  get title(): string {
    return this._title;
  }

  get idStudent(): number {
    return this._idStudent;
  }

}

