import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TimeService} from '../../services/time.service';
import {CalendarService} from '../../services/calendar.service';
import {Lesson} from '../../../../models/lesson.model';
import {TokenStorageService} from '../../../../service/token-storage/token-storage.service';
import {StudentParentService} from '../../../../service/personalities/studentParent.service';
import {MonthLesson} from '../../../../models/MonthLessons.model';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar.day.component.html',
  styleUrls: ['./calendar.day.component.less']
})
export class CalendarDayComponent implements OnInit {

  public year: number;
  public month: number;
  public day: number;
  private role = 'student'; // student or parent
  private childsId: number[] = [];

  public lessons: Lesson[] = [];

  constructor(private activatedRoute: ActivatedRoute, private calendar: CalendarService, private tokenStorageService: TokenStorageService, private studentParentService: StudentParentService) {
    if (this.activatedRoute === undefined) {
      this.year = this.calendar.getYear();
      this.month = this.calendar.getMonth();
      this.day = 1;
    } else {
      // @ts-ignore
      this.year = +this.activatedRoute.snapshot.paramMap.get('year_id');
      // @ts-ignore
      this.month = +this.activatedRoute.snapshot.paramMap.get('month_id');
      // @ts-ignore
      this.day = +this.activatedRoute.snapshot.paramMap.get('day_id');
      if (this.year < 1970 || this.year > 2100 || this.month < 0 || this.month > 11 || this.day < 1 || this.day > 31) {
        this.year = this.calendar.getYear();
        this.month = this.calendar.getMonth();
        this.day = this.calendar.getDay();
      }
    }

    this.getLessonsDay().then(lessons => {
      this.lessons = lessons;
    });

  }

  private getChilds(): Promise<number[]> {
    return this.studentParentService.getChildsId(this.tokenStorageService.getPerson().id);
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    // @ts-ignore
    this.year = +this.activatedRoute.snapshot.paramMap.get('year_id');
    // @ts-ignore
    this.month = +this.activatedRoute.snapshot.paramMap.get('month_id');
    // @ts-ignore
    this.day = +this.activatedRoute.snapshot.paramMap.get('day_id');
  }

  private getLessonsDay(): Promise<Lesson[]> {
    return new Promise<Lesson[]>(resolve => {
      if (this.tokenStorageService.getPerson().roles.includes('ROLE_PARENT')) {
        this.role = 'parent';
        // @ts-ignore
        const studId = this.activatedRoute.snapshot.paramMap.get('stud_id');

        if (studId === null) {
          this.getChilds().then(data => {
            this.childsId = data;
          }).then(() => {
            this.studentParentService.getLessonsMonth(this.childsId[0], this.year, this.month).then(allMonth => {
              resolve(new MonthLesson(allMonth, this.year, this.month).getLessonsByDay(this.day - 1));
            });
          });

        } else {
          this.studentParentService.getLessonsMonth(+studId, this.year, this.month).then(allMonth => {
            resolve(new MonthLesson(allMonth, this.year, this.month).getLessonsByDay(this.day - 1));
          });
        }
      } else {
        this.role = 'student';
        this.studentParentService.getLessonsMonth(this.tokenStorageService.getPerson().id, this.year, this.month).then(allMonth => {
          resolve(new MonthLesson(allMonth, this.year, this.month).getLessonsByDay(this.day - 1));
        });
      }
    });
  }

  getLink(direction: number): string {
    let url = '../../../';
    let d = this.day;
    let m = this.month;
    let y = this.year;
    if (direction === 1) {
      if (this.day === this.calendar.getCountOfDaysInMonth(this.year, this.month)) {
        d = 1;
        if (this.month === 11) {
          m = 0;
          ++y;
        } else {
          ++m;
        }
      } else {
        ++d;
      }
    } else {
      if (this.day === 1) {
        if (this.month === 0) {
          m = 11;
          --y;
        } else {
          --m;
        }
        d = this.calendar.getCountOfDaysInMonth(y, m);
      } else {
        --d;
      }
    }
    url += `${y}/${m}/${d}`;
    return url;
  }

  getMonth(): string {
    let result = this.calendar.getMonthString(this.month);
    result = result[0].toLowerCase() + result.slice(1);
    if (this.month === 2 || this.month === 7) {
      result += 'а';
    } else {
      result = result.slice(0, result.length - 1) + 'я';
    }
    return result;
  }

  getTimeBegin(): TimeService {
    return new TimeService(this.lessons[0].timeBegin.hour, this.lessons[0].timeBegin.minute);
  }

  getTimeEnd(): TimeService {
    return new TimeService(this.lessons[this.lessons.length - 1].timeEnd.hour, this.lessons[this.lessons.length - 1].timeEnd.minute);
  }

  getStyle(id: number): string {
    let top = 0;
    if (this.lessons[0].timeBegin.minute <= 30) {
      top = this.lessons[0].timeBegin.minute * (4 / 3);
    } else {
      top = (this.lessons[0].timeBegin.minute - 30) * (4 / 3);
    }
    top += TimeService.getHeight(new TimeService(this.lessons[0].timeBegin.hour, this.lessons[0].timeBegin.minute), new TimeService(this.lessons[id].timeBegin.hour, this.lessons[id].timeBegin.minute));
    return `top: ${top + 13}px`;
  }

}
