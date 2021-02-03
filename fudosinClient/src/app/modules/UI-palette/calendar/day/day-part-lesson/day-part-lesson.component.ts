import {Component, Input, OnInit} from '@angular/core';
import {CalendarTimeService} from '../../../services/calendar-time.service';
import {Lesson} from '../../../../../models/lesson.model';
import {StudentParentDictionary} from '../../../services/student-parent.dictionary';

@Component({
  selector: 'app-day-part-lesson',
  templateUrl: './day-part-lesson.component.html',
  styleUrls: ['./day-part-lesson.component.less']
})
export class DayPartLessonComponent implements OnInit {

  private d = new StudentParentDictionary();

  // @ts-ignore
  @Input() lesson: Lesson; // checked in parent component

  constructor() {
  }

  ngOnInit(): void {
  }

  getLesson(): string {
    if (this.lesson.title.toLowerCase() === this.d.schools.aikido) {
      return this.d.CSSnamespace.school.aikido;
    } else if (this.lesson.title.toLowerCase() === this.d.schools.kobudo) {
      return this.d.CSSnamespace.school.kobudo;
    } else {
      return this.d.CSSnamespace.school.jiu_jitsu;
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
      return this.d.CSSnamespace.paid.no;
    } else {
      return this.d.CSSnamespace.paid.yes;
    }
  }

  getHeight(): string {
    const height = Math.floor(CalendarTimeService.getHeight(new CalendarTimeService(this.lesson.timeBegin.hour, this.lesson.timeBegin.minute), new CalendarTimeService(this.lesson.timeEnd.hour, this.lesson.timeEnd.minute)));
    return `height: ${height - 5}px`;
  }

}
