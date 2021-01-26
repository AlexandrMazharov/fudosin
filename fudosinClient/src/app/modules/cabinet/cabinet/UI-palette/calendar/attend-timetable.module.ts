import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CalendarYearComponent} from './year/calendar.year.component';
import {CalendarMonthComponent} from './month/calendar.month.component';
import {CalendarDayComponent} from './day/calendar.day.component';
import {MonthPartDayComponent} from './month/month-part-day/month-part-day.component';
import {DayPartLessonComponent} from './day/day-part-lesson/day-part-lesson.component';
import {TimelineComponent} from './day/timeline/timeline.component';


@NgModule({
  declarations: [CalendarYearComponent, CalendarMonthComponent, CalendarDayComponent,
    MonthPartDayComponent, DayPartLessonComponent, TimelineComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AttendTimetableModule {
}
