import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AttendMonthComponent} from './attend-month/attend-month.component';
import {AttendYearComponent} from './attend-year/attend-year.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [AttendMonthComponent, AttendYearComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AttendModule { }
