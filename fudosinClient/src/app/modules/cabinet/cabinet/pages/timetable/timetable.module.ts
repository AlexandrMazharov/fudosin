import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimetableRouting} from './timetable.routing';
import {TimetableComponent} from './timetable.component';
import {AttendTimetableModule} from '../../../../UI-palette/calendar/attend-timetable.module';
import {PageHeaderModule} from '../../page-header/page-header.module';


@NgModule({
  declarations: [TimetableComponent],
  imports: [
    CommonModule,
    TimetableRouting,
    AttendTimetableModule,
    PageHeaderModule,
  ]
})
export class TimetableModule {
}
