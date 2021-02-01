export class TimeService {

  constructor(hours: number, minutes: number) {
    this.hours = hours;
    this.minutes = minutes;
  }

  hours: number;
  minutes: number;

  public static createTimelineTo(timeBegin: TimeService, timeEnd: TimeService): TimeService[] {
    const start = new TimeService(timeBegin.hours, 0);
    if (timeBegin.minutes > 30) {
      start.minutes = 30;
    }
    const finish = new TimeService(timeEnd.hours, 30);
    if (timeEnd.minutes > 30) {
      finish.addMinutes(30);
    }

    const result: TimeService[] = [];
    while (start.hours !== finish.hours || start.minutes !== finish.minutes) {
      result.push(new TimeService(start.hours, start.minutes));
      start.addMinutes(30);
    }
    result.push(new TimeService(start.hours, start.minutes));
    return result;
  }

  public static getHeight(timeBegin: TimeService, timeEnd: TimeService): number {
    let m = (timeEnd.hours * 60 + timeEnd.minutes) - (timeBegin.hours * 60 + timeBegin.minutes);
    m *= (4 / 3);
    return m;
  }

  public addMinutes(minutes: number): void {
    if (minutes < 0) {
      return;
    }
    this.minutes += minutes;
    if (this.minutes < 60) {
      return;
    }
    const h = Math.floor(this.minutes / 60);
    this.minutes = this.minutes - h * 60;
    this.addHours(h);
  }

  public addHours(hours: number): void {
    if (hours < 0) {
      return;
    }
    this.hours += hours;
    if (this.hours < 24) {
      return;
    }
    while (this.hours >= 24) {
      this.hours = Math.floor(this.hours / 24);
    }
  }

}
