import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarService} from '../pages/services/calendar.service';
import {StudentRouting} from './student.routing';
import {StudentComponent} from './student.component';
import {AttendModule} from '../pages/attend/attend.module';
import {PageHeaderModule} from '../page-header/page-header.module';



@NgModule({
  declarations: [StudentComponent],
  imports: [
    CommonModule,
    AttendModule,
    StudentRouting,
    PageHeaderModule
  ],
  providers: [CalendarService],
  exports: [StudentComponent]
})
export class StudentModule { }
