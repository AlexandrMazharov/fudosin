import {Component, Input, OnInit} from '@angular/core';
import {CalendarTimeService} from '../../../services/calendar-time.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.less']
})
export class TimelineComponent implements OnInit {

  @Input() timeBegin: CalendarTimeService;
  @Input() timeEnd: CalendarTimeService;
  public timeLine: CalendarTimeService[];

  constructor() {
    this.timeBegin = new CalendarTimeService(0, 0);
    this.timeEnd = new CalendarTimeService(0, 0);
    this.timeLine = [];
  }

  ngOnInit(): void {
    this.timeLine = CalendarTimeService.createTimelineTo(this.timeBegin, this.timeEnd);
  }

}
