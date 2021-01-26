import {Component, OnInit} from '@angular/core';
import {CalendarService} from '../../services/calendar.service';
import {ActivatedRoute, Router} from '@angular/router';

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

  // Потом удалить!
  lessons = [
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

  constructor(private calendar: CalendarService, private activatedRoute: ActivatedRoute, private route: Router) {
    if (this.activatedRoute == null) {
      this.year = calendar.getYear();
      this.month = calendar.getMonth();
      this.type = 'attend';
    } else {
      // @ts-ignore
      this.year = +this.activatedRoute.snapshot.paramMap.get('year_id');
      // @ts-ignore
      this.month = +this.activatedRoute.snapshot.paramMap.get('month_id');
      if (route.url.includes('attend')) {
        this.type = 'attend';
      } else {
        this.type = 'timetable';
      }
    }
    this.dayRows = this.fillMonth(calendar.getWeekDay(this.year, this.month, 0));
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

  createDocumentAttend(): void {

  }

  getMonth(): string {
    return this.calendar.getMonthString(this.month);
  }

  getMonthLink(direction: number): string {
    if (direction === -1) {
      if (this.month === 0) {
        return `../../../${(this.year - 1)}/month/11`;
      } else {
        return `../../../${this.year}/month/${(this.month - 1)}`;
      }
    } else {
      if (this.month === 11) {
        return `../../../${(this.year + 1)}/month/0`;
      } else {
        return `../../../${this.year}/month/${(this.month + 1)}`;
      }
    }
  }

}
