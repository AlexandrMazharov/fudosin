import {MonthLesson} from '../../../models/month-lessons.model';
import {Time} from '../../../models/time.model';
import {Lesson} from '../../../models/lesson.model';
import {CalendarService} from '../../../modules/UI-palette/services/calendar.service';

export class TimetableCreatorService {

  static create(lessons: MonthLesson, year: number, month: number): TimetableNode[] {
    const calendar = new CalendarService();
    const week = TimetableCreatorService.generateWeek(lessons, year, month, calendar);
    const timeTable = TimetableCreatorService.generateTimetable(week);
    return timeTable;
  }

  private static generateWeek(lessons: MonthLesson, year: number, month: number, calendar: CalendarService): Lesson[][] {
    let i = 0;
    while (calendar.getWeekDay(year, month, i) !== 0) {
      ++i;
    }
    const week = [];
    for (let j = i; j < i + 7; ++j) {
      week.push(lessons.getLessonsByDay(j));
    }
    return week;
  }

  private static generateTimetable(week: Lesson[][]): TimetableNode[] {
    const timeTable = [];
    for (let day = 0; day < week.length; ++day) {
      for (const lesson of week[day]) {
        let key = false;
        for (let j = 0; j < timeTable.length; ++j) {
          if (timeTable[j].name === lesson.title) {
            key = true;
            break;
          }
        }
        if (!key) {
          timeTable.push(new TimetableNode(lesson.title));
          timeTable[timeTable.length - 1].addLesson(lesson, day);
        } else {
          for (let j = 0; j < timeTable.length; ++j) {
            if (timeTable[j].name === lesson.title) {
              timeTable[j].addLesson(lesson, day);
            }
          }
        }
      }
    }
    return timeTable;
  }

}

class TimetableNode {

  private _name = '';
  private _week: DayNode[] = new Array(7);

  constructor(name: string) {
    this._name = name;
  }

  addLesson(lesson: Lesson, day: number): void {
    if (this._week[day] === undefined) {
      this._week[day] = new DayNode(day);
    }
    this._week[day].addLesson(lesson);
  }

  set name(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get week(): DayNode[] {
    return this._week;
  }
}

class DayNode {

  private _day = '';
  private _time: string[] = [];

  constructor(day: number) {
    this.weekDay(day);
  }

  private weekDay(day: number): void {
    switch (day) {
      case 0: {
        this._day = 'Понедельник';
        break;
      }
      case 1: {
        this._day = 'Вторник';
        break;
      }
      case 2: {
        this._day = 'Среда';
        break;
      }
      case 3: {
        this._day = 'Четверг';
        break;
      }
      case 4: {
        this._day = 'Пятница';
        break;
      }
      case 5: {
        this._day = 'Суббота';
        break;
      }
      case 6: {
        this._day = '';
        break;
      }
    }
  }

  private timeInterval(time: Time[]): string {
    const timeBeginEnd = [];
    for (const t of time) {
      let h;
      let m;
      if (t.hour < 10) {
        h = `0${t.hour}`;
      } else {
        h = t.hour;
      }
      if (t.minute < 10) {
        m = `0${t.minute}`;
      } else {
        m = t.minute;
      }
      timeBeginEnd.push(h + ':' + m);
    }
    if (time[0].hour < 10) {

    }
    return `${timeBeginEnd[0]} – ${timeBeginEnd[1]}`;
  }

  addLesson(lesson: Lesson): void {
    this._time.push(this.timeInterval([lesson.timeBegin, lesson.timeEnd]));
  }

  get day(): string {
    return this._day;
  }

  get time(): string[] {
    return this._time;
  }

}
