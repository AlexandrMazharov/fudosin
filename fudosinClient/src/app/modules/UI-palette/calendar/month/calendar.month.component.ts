import {Component, OnInit} from '@angular/core';
import {CalendarService} from '../../services/calendar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../../service/token-storage/token-storage.service';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar.month.component.html',
  styleUrls: ['./calendar.month.component.less']
})
export class CalendarMonthComponent implements OnInit {

  public year: number;
  public month: number; // January is 0, etc.
  public dayRows: number[][];
  public type: string;
  public role: string;

  // Потом удалить!
  public lessons = [
    {
      isPresent: 'Был',
      domain: 'Айкидо',
      paymentStatus: 'Оплачено'
    },
    {
      isPresent: 'Был',
      domain: 'Джиу-Джитсу',
      paymentStatus: 'Нет'
    },
    {
      isPresent: 'Нет',
      domain: 'Кобудо',
      paymentStatus: 'Оплачено'
    }
  ];

  constructor(private tokenStorageService: TokenStorageService, private calendar: CalendarService,
              private activatedRoute: ActivatedRoute, private route: Router) {
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
      if (route.url.includes('attend')) {
        this.type = 'attend';
      } else {
        this.type = 'timetable';
      }
    }
    this.dayRows = this.fillMonth(calendar.getWeekDay(this.year, this.month, 0));

    const user = this.tokenStorageService.getPerson();
    if (user === null || user === undefined) {
      this.role = 'student';
    } else if (user.roles.includes('ROLE_ADMIN')) {
      this.role = 'admin';
    } else if (user.roles.includes('ROLE_MODERATOR')) {
      this.role = 'instructor';
    } else if (user.roles.includes('ROLE_PARENT')) {
      this.role = 'parent';
    } else {
      this.role = 'student';
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

  getLessons() {

  }

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
