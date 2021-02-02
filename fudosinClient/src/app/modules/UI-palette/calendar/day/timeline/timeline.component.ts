import {Component, Input, OnInit} from '@angular/core';
import {TimeService} from '../../../services/time.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.less']
})
export class TimelineComponent implements OnInit {

  @Input() timeBegin: TimeService;
  @Input() timeEnd: TimeService;
  public timeLine: TimeService[];

  constructor() {
    this.timeBegin = new TimeService(0, 0);
    this.timeEnd = new TimeService(0, 0);
    this.timeLine = [];
  }

  ngOnInit(): void {
    this.timeLine = TimeService.createTimelineTo(this.timeBegin, this.timeEnd);
  }

}
