import {Injectable} from '@angular/core';
import {StudentParentDictionary} from './student-parent.dictionary';

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

  getDay(): number {
    return this.date.getDate();
  }

  getFullDate(): string {
    const d = this.getDay();
    let zeroD = '';
    if (d < 10) {
      zeroD = '0';
    }
    const m = this.getMonth() + 1;
    let zeroM = '';
    if (m < 10) {
      zeroM = '0';
    }
    const y = this.getYear();
    return `${zeroD}${d}.${zeroM}${m}.${y} г.`;
  }

  getWeekDay(year: number, month: number, day: number): number {
    return new Date(year, month, day).getDay();
  }

  setDateInMillsLeft(year: number, month: number, day: number): number {
    return new Date(year, month, day, 0, 0, 0, 1).getTime();
  }

  setDateInMillsRight(year: number, month: number, day: number): number {
    return new Date(year, month, day, 23, 59, 59, 999).getTime();
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
