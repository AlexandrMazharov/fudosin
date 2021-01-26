import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentRouting} from './student.routing';
import {StudentComponent} from './student.component';
import {PageHeaderModule} from '../page-header/page-header.module';
import {AttendTimetableModule} from '../../../UI-palette/calendar/attend-timetable.module';



@NgModule({
  declarations: [StudentComponent],
  imports: [
    CommonModule,
    StudentRouting,
    PageHeaderModule,
    AttendTimetableModule
  ],
  providers: [],
  exports: [StudentComponent]
})
export class StudentModule { }
