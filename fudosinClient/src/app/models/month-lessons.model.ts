import {Lesson} from './lesson.model';
import {CalendarService} from '../modules/UI-palette/services/calendar.service';

export class MonthLesson {

  private _data: DayLesson[];

  constructor(lessons: Lesson[], idYear: number, idMonth: number) {
    this._data = new Array(new CalendarService().getCountOfDaysInMonth(idYear, idMonth));
    for (let i = 0; i < this._data.length; ++i) {
      let j = 0;
      this._data[i] = new DayLesson(i + 1);
      while (j < lessons.length) {
        if (lessons[j].timeBegin.day === i + 1) {
          this._data[i].addData(lessons[j]);
        }
        ++j;
      }
    }
    this._data = this.sort(this._data);
  }

  getLessonsByDay(day: number): Lesson[] {
    return this._data[day].data;
  }

  private sort(mas: DayLesson[]): DayLesson[] {
    for (let day of mas) {
      for (let j = day.data.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
          if ((day.data[i].timeBegin.hour > day.data[i + 1].timeBegin.hour) || ((day.data[i].timeBegin.hour === day.data[i + 1].timeBegin.hour) && (day.data[i].timeBegin.minute > day.data[i + 1].timeBegin.minute))) {
            let temp = day.data[i];
            day.data[i] = day.data[i + 1];
            day.data[i + 1] = temp;
          }
        }
      }
    }
    return mas;
  }

}


class DayLesson {

  private _day: number;
  private _data: Lesson[];

  constructor(day: number) {
    this._day = day;
    this._data = [];
  }

  get day(): number {
    return this._day;
  }

  get data(): Lesson[] | [] {
    return this._data;
  }

  addData(value: Lesson): void {
    this._data.push(value);
  }

}
