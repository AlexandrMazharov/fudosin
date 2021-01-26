import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-month-part-day-student',
  templateUrl: './month-part-day-student.component.html',
  styleUrls: ['./month-part-day-student.component.less']
})
export class MonthPartDayStudentComponent implements OnInit {

  @Input() title: number;
  @Input() lessons: any;
  @Input() type: string | 'attend'; // attend or timetable

  constructor() {
    this.title = 0;
    this.type = 'attend';
  }

  ngOnInit(): void {
  }

  getLight(lesson: any): string {
    if (this.type === 'timetable') {
      return this.place(lesson);
    } else {
      return this.visit(lesson);
    }
  }

  getTitle(lesson: any): string {
    return lesson.domain;
  }

  private visit(lesson: any): string {
    if (lesson.isPresent === 'Был') {
      return 'present';
    } else {
      return 'non-present';
    }
  }

  private place(lesson: any): string {
    if (lesson.domain.toLowerCase() === 'айкидо') {
      return 'aikido';
    } else if (lesson.domain.toLowerCase() === 'кобудо') {
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
