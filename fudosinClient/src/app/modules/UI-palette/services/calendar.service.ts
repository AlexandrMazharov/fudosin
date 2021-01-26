import {Injectable} from '@angular/core';

@Injectable()
export class CalendarService {

  private date: Date;

  constructor() {
    this.date = new Date();
  }

  private months = [
    'Январь', 'Февраль', 'Март',
    'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь',
    'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  private weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  private countOfDays = [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 29
  ];

  getMonthStringNow(): string {
    return this.months[this.date.getMonth()];
  }

  getMonthString(id: number): string {
    return this.months[id];
  }

  getYear(): number {
    return this.date.getFullYear();
  }

  getMonth(): number {
    return this.date.getMonth();
  }

  getWeekDay(year: number, month: number, day: number): number {
    return new Date(year, month, day).getDay();
  }

  getCountOfDaysInMonth(year: number, month: number): number {
    if (month !== 1) { // it is February
      return this.countOfDays[month];
    } else {
      if (year % 4 !== 0) {
        return this.countOfDays[month];
      } else { // leap-year
        return this.countOfDays[this.countOfDays.length - 1];
      }
    }
  }

}