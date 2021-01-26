export class Time {

  private _year: number;
  private _month: number;
  private _day: number;
  private _hour: number;
  private _minute: number;
  private _locale: string;

  constructor(time: string) {
    const [date, clock] = time.split('T');
    this._year = parseInt(date.split('-')[0], 10);
    this._month = parseInt(date.split('-')[1], 10);
    this._day = parseInt(date.split('-')[2], 10);
    this._hour = parseInt(clock.split('-')[0], 10);
    this._minute = parseInt(clock.split('-')[0], 10);
  }

  '2020-03-03T15:00:00.000+00:00';

  get year(): number {
    return this._year;
  }

  get month(): number {
    return this._month;
  }

  get day(): number {
    return this._day;
  }

  get hour(): number {
    return this._hour;
  }

  get minute(): number {
    return this._minute;
  }

  get locale(): string {
    return this._locale;
  }

}
