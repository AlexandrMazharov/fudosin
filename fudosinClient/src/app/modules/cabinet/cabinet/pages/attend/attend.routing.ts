import {RouterModule, Routes} from '@angular/router';
import {CalendarYearComponent} from '../../../../UI-palette/calendar/year/calendar.year.component';
import {CalendarMonthComponent} from '../../../../UI-palette/calendar/month/calendar.month.component';
import {NgModule} from '@angular/core';

export const AttendRoutes: Routes = [
  {path: '', component: CalendarYearComponent},
  {path: ':stud_id', component: CalendarYearComponent},
  {path: ':year_id/:month_id', component: CalendarMonthComponent},
  {path: ':stud_id/:year_id/:month_id', component: CalendarMonthComponent},
  // {path: 'instructor/', component: },
  // {path: 'admin', component:},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(AttendRoutes)],
  exports: [RouterModule]
})
export class AttendRouting {
}
