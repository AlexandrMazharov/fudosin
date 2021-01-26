import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CalendarYearComponent} from './year/calendar.year.component';
import {CalendarMonthComponent} from './month/calendar.month.component';
import {CalendarDayComponent} from './day/calendar.day.component';
import {TimelineComponent} from './day/timeline/timeline.component';
import {MonthPartDayStudentComponent} from './month/month-part-day-student/month-part-day-student.component';
import {DayPartLessonComponent} from './day/day-part-lesson/day-part-lesson.component';
import {CalendarService} from '../services/calendar.service';


@NgModule({
  declarations: [CalendarYearComponent, CalendarMonthComponent, CalendarDayComponent,
    MonthPartDayStudentComponent, DayPartLessonComponent, TimelineComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [CalendarService]
})
export class AttendTimetableModule {
}
