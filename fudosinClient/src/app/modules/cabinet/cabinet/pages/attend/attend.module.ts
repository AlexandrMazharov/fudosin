import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttendRouting} from './attend.routing';
import {AttendComponent} from './attend.component';
import {AttendTimetableModule} from '../../../../UI-palette/calendar/attend-timetable.module';
import {PageHeaderModule} from '../../page-header/page-header.module';


@NgModule({
  declarations: [AttendComponent],
  imports: [
    CommonModule,
    AttendRouting,
    AttendTimetableModule,
    PageHeaderModule,
  ]
})
export class AttendModule {
}
