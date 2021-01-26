import {Component, OnInit} from '@angular/core';
import {CalendarService} from '../../services/calendar.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-attend-month',
  templateUrl: './attend-month.component.html',
  styleUrls: ['./attend-month.component.less']
})
export class AttendMonthComponent implements OnInit {

  public year: number;
  public month: number; // January is 0, etc.
  public dayRows: number[][];

  constructor(private calendar: CalendarService, private activatedRoute: ActivatedRoute) {
    this.year = calendar.getYear();
    this.month = calendar.getMonth();
    if (this.activatedRoute == null) {
    } else {
      // this.year = +this.activatedRoute.snapshot.paramMap.get('year_id');
      // this.month = +this.activatedRoute.snapshot.paramMap.get('month_id');
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
    arr.push(arrPart);

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

  getMonth(): string {
    return this.calendar.getMonthString(this.month);
  }

  getMonthLink(direction: number): string {
    if (direction === -1) {
      if (this.month === 0) {
        return `${(this.year - 1)}/month/11`;
      } else {
        return `${this.year}/month/${(this.month - 1)}`;
      }
    } else {
      if (this.month === 11) {
        return `${(this.year + 1)}/month/0`;
      } else {
        return `${this.year}/month/${(this.month + 1)}`;
      }
    }
  }

}
