import {Component, Input, OnInit} from '@angular/core';
import {TimeService} from '../../../services/time.service';
import {Lesson} from '../../../../../models/lesson.model';

@Component({
  selector: 'app-day-part-lesson',
  templateUrl: './day-part-lesson.component.html',
  styleUrls: ['./day-part-lesson.component.less']
})
export class DayPartLessonComponent implements OnInit {

  // @ts-ignore
  @Input() lesson: Lesson; // checked in parent component

  constructor() {
  }

  ngOnInit(): void {
  }

  getLesson(): string {
    if (this.lesson.title.toLowerCase() === 'айкидо') {
      return 'aikido';
    } else if (this.lesson.title.toLowerCase() === 'кобудо') {
      return 'kobudo';
    } else {
      return 'jiu-jitsu';
    }
  }

  getTitle(): string {
    let result = this.lesson.title.toLowerCase();
    result = result[0].toUpperCase() + result.slice(1);
    return result;
  }

  getText(): string {
    return this.lesson.place;
  }

  getPaid(): string {
    if (!this.lesson.paymentStatus) {
      return 'no-money';
    } else {
      return 'money';
    }
  }

  getHeight(): string {
    const height = Math.floor(TimeService.getHeight(new TimeService(this.lesson.timeBegin.hour, this.lesson.timeBegin.minute), new TimeService(this.lesson.timeEnd.hour, this.lesson.timeEnd.minute)));
    return `height: ${height - 5}px`;
  }

}
