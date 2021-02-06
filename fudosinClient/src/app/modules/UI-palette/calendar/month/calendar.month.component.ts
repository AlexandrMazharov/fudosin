import {Component, OnInit} from '@angular/core';
import {CalendarService} from '../../services/calendar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../../service/token-storage/token-storage.service';
import {MonthLesson} from '../../../../models/month-lessons.model';
import {PdfCreateService} from '../../../../service/pdfDoc/pdf-create.service';
import {StudentParentDictionary} from '../../services/student-parent.dictionary';
import {StudentParentService} from '../../../../service/personalities/student-parent-http.service';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar.month.component.html',
  styleUrls: ['./calendar.month.component.less']
})
export class CalendarMonthComponent implements OnInit {

  private d = new StudentParentDictionary();
  public year: number;
  public month: number; // January is 0, etc.
  public dayRows: number[][];
  public type: string; // attend or timetable
  public role = this.d.userRoles.student; // student or parent
  public childs: string[] = [];
  public monthName = '';
  private childsId: number[] = [];

  public lessons: MonthLesson = new MonthLesson([], 0, 0);

  constructor(private tokenStorageService: TokenStorageService, private calendar: CalendarService,
              private activatedRoute: ActivatedRoute, private route: Router,
              private studentParentService: StudentParentService) {
    if (this.activatedRoute == null) {
      this.year = calendar.getYear();
      this.month = calendar.getMonth();
      this.type = this.d.calendarTypeWork.attend;
    } else {
      // @ts-ignore
      this.year = +this.activatedRoute.snapshot.paramMap.get(this.d.URLparams.year);
      // @ts-ignore
      this.month = +this.activatedRoute.snapshot.paramMap.get(this.d.URLparams.month);
      if (this.year < 1970 || this.year > 2100 || this.month < 0 || this.month > 11) {
        this.year = calendar.getYear();
        this.month = calendar.getMonth();
      }
      if (this.route.url.includes(this.d.URLmarks.ifAsAttend)) {
        this.type = this.d.calendarTypeWork.attend;
      } else {
        this.type = this.d.calendarTypeWork.timetable;
      }
    }
    this.dayRows = this.fillMonth(calendar.getWeekDay(this.year, this.month, 0));
    this.monthName = this.getMonth();
    this.httpInit();
  }

  private fillMonth(firstDay: number): number[][] {
    const arr = new Array();
    const count = this.calendar.getCountOfDaysInMonth(this.year, this.month);
    let key = true;
    let day = 1;

    let arrPart = [7];
    for (let i = 0; i < 7; ++i) {
      if (i !== firstDay && key) {
        arrPart[i] = 0;
      } else {
        arrPart[i] = day;
        ++day;
        key = false;
      }
    }
    if (arrPart[6] !== 1) {
      arr.push(arrPart);
    }

    key = true;
    while (day <= count) {
      arrPart = [7];
      for (let i = 0; i < 7; ++i) {
        if (key) {
          arrPart[i] = day;
          ++day;
          if (!(day <= count)) {
            key = false;
          }
        } else {
          arrPart[i] = 0;
        }
      }
      arr.push(arrPart);
    }

    return arr;
  }

  ngOnInit(): void {
  }

  httpInit(): void {
    if (this.tokenStorageService.getPerson().roles.includes(this.d.ERoles.parent)) {
      this.role = this.d.userRoles.parent;
      this.getChilds();
    } else {
      this.role = this.d.userRoles.student;
      this.childs = [];
      this.childsId = [];
      this.getLessons(this.tokenStorageService.getPerson().id);
    }
  }

  turn(): void {
    this.lessons = new MonthLesson([], 0, 0);
    setTimeout(() => {
      this.httpInit();
    }, 100);
  }

  ngDoCheck() {
    // @ts-ignore
    this.year = +this.activatedRoute.snapshot.paramMap.get(this.d.URLparams.year);
    // @ts-ignore
    this.month = +this.activatedRoute.snapshot.paramMap.get(this.d.URLparams.month);
    this.dayRows = this.fillMonth(this.calendar.getWeekDay(this.year, this.month, 0));
    this.monthName = this.getMonth();
  }

  getChildLink(id: number): string {
    if (this.route.url.includes(this.d.URLmarks.ifAsParent)) {
      return `../../../../s/${this.childsId[id]}/${this.year}/${this.month}`;
    } else {
      return `../../s/${this.childsId[id]}/${this.year}/${this.month}`;
    }
  }

  private getChilds(): void {
    this.studentParentService.getChildsId(this.tokenStorageService.getPerson().id)
      .subscribe(arr => {
        this.childsId = arr;
        this.studentParentService.getFullNames(this.childsId).subscribe(names => {
          this.childs = names;
          this.getLessons(this.childsId[0]);
        });
      });
  }

  private getLessons(idPerson: number): void {
    let studId;
    if (this.activatedRoute.snapshot.paramMap.get(this.d.URLparams.student) !== null) {
      // @ts-ignore
      studId = +this.activatedRoute.snapshot.paramMap.get(this.d.URLparams.student);
    } else {
      studId = idPerson;
    }
    if (this.type === this.d.calendarTypeWork.attend) {
      this.studentParentService.getMonthLessonsAttend(studId, this.year, this.month)
        .subscribe(lessons => this.lessons = new MonthLesson(lessons, this.year, this.month));
    } else {
      this.studentParentService.getMonthLessonsTimetable(studId, this.year, this.month)
        .subscribe(lessons => this.lessons = new MonthLesson(lessons, this.year, this.month));
    }
  }

  createDocumentAttend(): void {
    let id = 0;
    if (this.role === this.d.userRoles.student) {
      id = this.tokenStorageService.getPerson().id;
    } else {
      if (this.activatedRoute.snapshot.paramMap.get(this.d.URLparams.student) === null) {
        id = this.childsId[0];
      } else {
        // @ts-ignore
        id = +this.activatedRoute.snapshot.paramMap.get(this.d.URLparams.student);
      }
    }
    this.studentParentService.getFullName(id).subscribe(fullName => {
      new PdfCreateService(`${fullName}`, this.lessons, this.year, this.month).create();
    });
  }

  getMonth(): string {
    return this.calendar.getMonthString(this.month);
  }

  getMonthLink(direction: number): string {
    if (direction === -1) {
      if (this.month === 0) {
        return `../../${(this.year - 1)}/11`;
      } else {
        return `../../${this.year}/${(this.month - 1)}`;
      }
    } else {
      if (this.month === 11) {
        return `../../${(this.year + 1)}/0`;
      } else {
        return `../../${this.year}/${(this.month + 1)}`;
      }
    }
  }

  getBack(): string {
    if (this.route.url.includes('/s/')) {
      return `../../../../`;
    } else {
      return `../../`;
    }
  }

  firstActivated(i: number): string {
    if (this.role === this.d.userRoles.parent && i === 0) {
      return `active-tab`;
    } else {
      return '';
    }
  }

  now(day: number): boolean {
    return (day === this.calendar.getDay() && this.month === this.calendar.getMonth())
  }
}
