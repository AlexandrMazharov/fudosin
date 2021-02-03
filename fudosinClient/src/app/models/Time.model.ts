export class Time {

  private _year: number;
  private _month: number;
  private _day: number;
  private _hour: number;
  private _minute: number;
  private _locale: number;

  constructor(time: string) { // '2020-03-03T15:00:00.000+00:00'
    const [date, clock] = time.split('T'); // 2020-03-03   15:00:00.000+00:00

    this._year = parseInt(date.split('-')[0], 10);  // 2020   03   03
    this._month = parseInt(date.split('-')[1], 10);
    this._day = parseInt(date.split('-')[2], 10);

    const [clocks, loc] = clock.split('.'); // 15:00:00   000+00:00

    this._hour = parseInt(clocks.split(':')[0], 10); // 15   00   00
    this._minute = parseInt(clocks.split(':')[1], 10);

    const locale = loc.split('+')[1].split(':')[0];  // 000   // 00   00
    this._locale = parseInt(locale, 10);
  }

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

  get locale(): number {
    return this._locale;
  }

}
