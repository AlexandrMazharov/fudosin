import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CalendarService} from '../../services/calendar.service';
import {TimeService} from '../../services/time.service';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar.day.component.html',
  styleUrls: ['./calendar.day.component.less']
})
export class CalendarDayComponent implements OnInit {

  public year;
  public month;
  public day;

  lessons = [
    {
      id: 1,
      timeBegin: new TimeService(14, 0),
      timeEnd: new TimeService(15, 30),
      isPresent: 'Был',
      domain: 'Айкидо',
      paymentStatus: 'Оплачено'
    },
    {
      id: 2,
      timeBegin: new TimeService(15, 30),
      timeEnd: new TimeService(17, 0),
      isPresent: 'Нет',
      domain: 'Кобудо',
      paymentStatus: 'Оплачено'
    },
    {
      id: 3,
      timeBegin: new TimeService(17, 0),
      timeEnd: new TimeService(19, 30),
      isPresent: 'Был',
      domain: 'Джиу-Джитсу',
      paymentStatus: 'Нет'
    },
  ];


  constructor(private activatedRoute: ActivatedRoute, private calendar: CalendarService) {
    if (this.activatedRoute === undefined) {
      this.year = 0;
      this.month = 0;
      this.day = 0;
    } else {
      // @ts-ignore
      this.year = +this.activatedRoute.snapshot.paramMap.get('year_id');
      // @ts-ignore
      this.month = +this.activatedRoute.snapshot.paramMap.get('month_id');
      // @ts-ignore
      this.day = +this.activatedRoute.snapshot.paramMap.get('day_id');
    }
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

  getLink(direction: number): string {
    let url = '../../../../';
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
    url += `${y}/month/${m}/${d}`;
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
    return new TimeService(this.lessons[0].timeBegin.hours, this.lessons[0].timeBegin.minutes);
  }

  getTimeEnd(): TimeService {
    return new TimeService(this.lessons[this.lessons.length - 1].timeEnd.hours, this.lessons[this.lessons.length - 1].timeEnd.minutes);
  }

  getStyle(id: number): string {
    let top = 0;
    if (this.lessons[0].timeBegin.minutes < 30) {
      top = this.lessons[0].timeBegin.minutes * (4 / 3);
    } else {
      top = (this.lessons[0].timeBegin.minutes - 30) * (4 / 3);
    }
    top += TimeService.getHeight(this.lessons[0].timeBegin, this.lessons[id].timeBegin);
    return `top: ${top + 13}px`;
  }

}
