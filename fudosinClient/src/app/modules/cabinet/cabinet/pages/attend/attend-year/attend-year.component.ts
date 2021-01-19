import {Component, OnInit} from '@angular/core';
import {CalendarService} from '../../services/calendar.service';

@Component({
  selector: 'app-attend-year',
  templateUrl: './attend-year.component.html',
  styleUrls: ['./attend-year.component.less']
})
export class AttendYearComponent implements OnInit {

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
