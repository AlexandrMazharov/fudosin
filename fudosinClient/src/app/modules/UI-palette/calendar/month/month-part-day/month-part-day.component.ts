import {Component, Input, OnInit} from '@angular/core';
import {Lesson} from '../../../../../models/lesson.model';

@Component({
  selector: 'app-month-part-day',
  templateUrl: './month-part-day.component.html',
  styleUrls: ['./month-part-day.component.less']
})
export class MonthPartDayComponent implements OnInit {

  @Input() title: number;
  @Input() lessons: Lesson[] | undefined;
  @Input() type: string | 'attend'; // attend or timetable
  @Input() role: string | 'student'; // student or parent

  constructor() {
    this.title = 0;
    this.type = 'attend';
    this.role = 'student';
  }

  ngOnInit(): void {
  }

  getLight(lesson: Lesson): string {
    if (this.type === 'timetable') {
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
      return 'present';
    } else {
      return 'non-present';
    }
  }

  private place(lesson: Lesson): string {
    if (lesson.title.toLowerCase() === 'айкидо') {
      return 'aikido';
    } else if (lesson.title.toLowerCase() === 'кобудо') {
      return 'kobudo';
    } else {
      return 'jiu-jitsu';
    }
  }

  getLink(): string {
    if (this.type === 'timetable') {
      return this.title + '';
    } else {
      return './';
    }
  }

}
