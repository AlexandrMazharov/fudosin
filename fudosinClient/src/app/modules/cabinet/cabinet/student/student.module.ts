import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarService} from '../pages/services/calendar.service';
import {StudentRouting} from './student.routing';
import {StudentComponent} from './student.component';
import {AttendModule} from '../pages/attend/attend.module';



@NgModule({
  declarations: [StudentComponent],
  imports: [
    CommonModule,
    AttendModule,
    StudentRouting
  ],
  providers: [CalendarService],
  exports: [StudentComponent]
})
export class StudentModule { }
