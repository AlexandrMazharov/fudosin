import {Component, OnInit} from '@angular/core';
import {CalendarService} from '../../services/calendar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../../service/token-storage/token-storage.service';
import {Observable} from 'rxjs';
import {Lesson} from '../../../../models/lesson.model';
import {StudentService} from '../../../../service/personalities/student.service';
import {MonthLesson} from '../../services/MonthLessons.model';
import {ParentService} from '../../../../service/personalities/parent.service';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar.month.component.html',
  styleUrls: ['./calendar.month.component.less']
})
export class CalendarMonthComponent implements OnInit {

  public year: number;
  public month: number; // January is 0, etc.
  public dayRows: number[][];
  public type: string; // attend or timetable
  public role: string; // student or parent
  public childs: string[];
  private childsId: string[];

  public lessons: MonthLesson;

  constructor(private tokenStorageService: TokenStorageService, private calendar: CalendarService,
              private activatedRoute: ActivatedRoute, private route: Router,
              private studentService: StudentService, private parentService: ParentService) {
    if (this.activatedRoute == null) {
      this.year = calendar.getYear();
      this.month = calendar.getMonth();
      this.type = 'attend';
    } else {
      // @ts-ignore
      this.year = +this.activatedRoute.snapshot.paramMap.get('year_id');
      // @ts-ignore
      this.month = +this.activatedRoute.snapshot.paramMap.get('month_id');
      if (this.year < 1970 || this.year > 2100 || this.month < 0 || this.month > 11) {
        this.year = calendar.getYear();
        this.month = calendar.getMonth();
      }
      if (this.route.url.includes('attend')) {
        this.type = 'attend';
      } else {
        this.type = 'timetable';
      }
    }
    this.dayRows = this.fillMonth(calendar.getWeekDay(this.year, this.month, 0));

    // const studId = this.activatedRoute.snapshot.paramMap.get('stud_id');
    // if (studId !== null) {
    //   this.getLessons(+studId).subscribe(lessons => {
    //     this.lessons = lessons;
    //   });
    // } else {
    //   this.getLessons(-1).subscribe(lessons => {
    //     this.lessons = lessons;
    //   });
    // }

    this.lessons = new MonthLesson(this.getLessons(), this.year, this.month);

    if (this.tokenStorageService.getPerson().roles.includes('ROLE_PARENT')) {
      this.role = 'parent';
      // this.getChilds().subscribe(childs => {
      //   this.childs = childs[0];
      //   this.childsId = childs[1];
      // });
      this.childs = this.getChilds();
      this.childsId = ['0', '1', '2'];
    } else {
      this.role = 'student';
      this.childs = [];
      this.childsId = [];
    }
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

  ngDoCheck() {
    // @ts-ignore
    this.year = +this.activatedRoute.snapshot.paramMap.get('year_id');
    // @ts-ignore
    this.month = +this.activatedRoute.snapshot.paramMap.get('month_id');
    this.dayRows = this.fillMonth(this.calendar.getWeekDay(this.year, this.month, 0));
  }

  getChilds(): string[] {
    return [
      'Иван Иванов',
      'Петр Иванов',
      'Мария Иванова'
    ];
  }

  getChildLink(id: number): string {
    if (this.route.url.includes('s')) {
      return `../../../../s/${this.childsId[id]}/${this.year}/${this.month}`;
    } else {
      return `../../s/${this.childsId[id]}/${this.year}/${this.month}`;
    }
  }

  // private getChilds(): Observable<string[][]> { // fix it!!!
  //   return this.parentService.getChilds(this.tokenStorageService.getPerson().id);
  // }

  getLessons(): Lesson[] {
    return [
      new Lesson(false, true, '2021-01-03T15:00:00.000+00:00', '2021-01-03T17:00:00.000+00:00', 'Орбита', 'Айкидо', 1),
      new Lesson(true, false, '2021-01-03T17:00:00.000+00:00', '2021-01-03T19:00:00.000+00:00', 'Орбита', 'Кобудо', 1),
      new Lesson(true, true, '2021-01-03T19:00:00.000+00:00', '2021-01-03T21:00:00.000+00:00', 'Орбита', 'Джиу-Джитсу', 1),
      new Lesson(false, false, '2021-01-08T15:00:00.000+00:00', '2021-01-08T17:00:00.000+00:00', 'Орбита', 'Айкидо', 1),
      new Lesson(true, true, '2021-01-08T17:00:00.000+00:00', '2021-01-08T19:00:00.000+00:00', 'Орбита', 'Кобудо', 1),
      new Lesson(true, false, '2021-01-08T19:00:00.000+00:00', '2021-01-08T21:00:00.000+00:00', 'Орбита', 'Джиу-Джитсу', 1),
      new Lesson(false, true, '2021-01-09T15:00:00.000+00:00', '2021-01-09T17:00:00.000+00:00', 'Орбита', 'Айкидо', 1),
      new Lesson(true, false, '2021-01-09T17:00:00.000+00:00', '2021-01-09T19:00:00.000+00:00', 'Орбита', 'Кобудо', 1),
      new Lesson(false, false, '2021-01-09T19:00:00.000+00:00', '2021-01-09T21:00:00.000+00:00', 'Орбита', 'Джиу-Джитсу', 1),
      new Lesson(true, false, '2021-01-15T15:00:00.000+00:00', '2021-01-15T17:00:00.000+00:00', 'Орбита', 'Айкидо', 1),
      new Lesson(false, false, '2021-01-15T17:00:00.000+00:00', '2021-01-15T19:00:00.000+00:00', 'Орбита', 'Кобудо', 1),
      new Lesson(false, false, '2021-01-15T19:00:00.000+00:00', '2021-01-15T21:00:00.000+00:00', 'Орбита', 'Джиу-Джитсу', 1),
    ];
  }

  // getLessons(id: number): Observable<Lesson[]> {
  //   if (id !== -1) {
  //     return this.studentService.getLessonsMonthStudent(id, this.year, this.month);
  //   } else {
  //     return this.studentService.getLessonsMonth(this.tokenStorageService.getPerson().id, this.year, this.month); // fix it!
  //   }
  // }

  createDocumentAttend(): void {

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

}
