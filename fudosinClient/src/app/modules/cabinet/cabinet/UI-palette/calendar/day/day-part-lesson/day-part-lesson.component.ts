import {Component, Input, OnInit} from '@angular/core';
import {TimeService} from '../../../services/time.service';

@Component({
  selector: 'app-day-part-lesson',
  templateUrl: './day-part-lesson.component.html',
  styleUrls: ['./day-part-lesson.component.less']
})
export class DayPartLessonComponent implements OnInit {

  @Input() lesson: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  getLesson(): string {
    if (this.lesson.domain.toLowerCase() === 'айкидо') {
      return 'aikido';
    } else if (this.lesson.domain.toLowerCase() === 'кобудо') {
      return 'kobudo';
    } else {
      return 'jiu-jitsu';
    }
  }

  getTitle(): string {
    let result = this.lesson.domain.toLowerCase();
    result = result[0].toUpperCase() + result.slice(1);
    return result;
  }

  getText(): string {
    return 'blablablablab lablablablablablabla blablablabla';
  }

  getPaid(): string {
    if (this.lesson.paymentStatus.toLowerCase().includes('нет')) {
      return 'no-money';
    } else {
      return 'money';
    }
  }

  getHeight(): string {
    const height = Math.floor(TimeService.getHeight(this.lesson.timeBegin, this.lesson.timeEnd));
    return `height: ${height - 5}px`;
  }

}
