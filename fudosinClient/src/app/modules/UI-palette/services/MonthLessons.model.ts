import {Lesson} from '../../../models/lesson.model';
import {CalendarService} from './calendar.service';

export class MonthLesson {

  private _data: DayLesson[];

  constructor(lessons: Lesson[], idYear: number, idMonth: number) {
    this._data = new Array(new CalendarService().getCountOfDaysInMonth(idYear, idMonth));
    let j = 0;
    for (let i = 0; i < this._data.length; ++i) {
      this._data[i] = new DayLesson(i + 1);
      let key = true;
      while (key && lessons[j] !== undefined) {
        if (lessons[j].timeBegin.day === i + 1) {
          this._data[i].addData(lessons[j]);
          ++j;
        } else {
          key = false;
        }
      }
    }
  }

  getLessonsByDay(day: number): Lesson[] | undefined {
    if (this._data[day] === undefined) {
      return undefined;
    } else {
      return this._data[day].data;
    }
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
