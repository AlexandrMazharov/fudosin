import {Component, OnInit} from '@angular/core';
import {CalendarService} from '../../services/calendar.service';

@Component({
  selector: 'app-calendar-year',
  templateUrl: './calendar.year.component.html',
  styleUrls: ['./calendar.year.component.less']
})
export class CalendarYearComponent implements OnInit {

  public year: number;
  public rows = [0, 1, 2, 3];

  constructor(private calendar: CalendarService) {
    this.year = 0;
  }

  ngOnInit(): void {
    this.year = this.calendar.getYear();
  }

  getMonthString(id: number): string {
    return this.calendar.getMonthString(id);
  }

  turnPrevYear(): void {
    --this.year;
  }

  turnNextYear(): void {
    ++this.year;
  }


}
