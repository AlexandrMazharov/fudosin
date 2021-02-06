import {Component, Input, OnInit} from '@angular/core';
import {Lesson} from '../../../../../models/lesson.model';
import {StudentParentDictionary} from '../../../services/student-parent.dictionary';

@Component({
  selector: 'app-month-part-day',
  templateUrl: './month-part-day.component.html',
  styleUrls: ['./month-part-day.component.less']
})
export class MonthPartDayComponent implements OnInit {

  private d = new StudentParentDictionary();

  @Input() title: number;
  @Input() lessons: Lesson[] | undefined;
  @Input() type: string; // attend or timetable
  @Input() role: string; // student or parent
  @Input() now = false;

  constructor() {
    this.title = 0;
    this.type = this.d.calendarTypeWork.attend;
    this.role = this.d.userRoles.student;
  }

  ngOnInit(): void {
  }

  getLight(lesson: Lesson): string {
    if (this.type === this.d.calendarTypeWork.timetable) {
      return this.place(lesson);
    } else {
      return this.visit(lesson);
    }
  }

  getTitle(lesson: Lesson): string {
    return lesson.title;
  }

  private visit(lesson: Lesson): string {
    if (lesson.isPresent) {
      return this.d.CSSnamespace.present.yes;
    } else {
      return this.d.CSSnamespace.present.no;
    }
  }

  private place(lesson: Lesson): string {
    if (lesson.title.toLowerCase() === this.d.schools.aikido) {
      return this.d.CSSnamespace.school.aikido;
    } else if (lesson.title.toLowerCase() === this.d.schools.kobudo) {
      return this.d.CSSnamespace.school.kobudo;
    } else {
      return this.d.CSSnamespace.school.jiu_jitsu;
    }
  }

  getLink(): string {
    if (this.type === this.d.calendarTypeWork.timetable) {
      return this.title + '';
    } else {
      return './';
    }
  }

  nowDays(): string {
    if (this.now) {
      return `box-shadow: 8px 8px 10px #ff9ac6;`;
    } else {
      return '';
    }
  }

}
