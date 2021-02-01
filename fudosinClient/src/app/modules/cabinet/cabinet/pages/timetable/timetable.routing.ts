import {RouterModule, Routes} from '@angular/router';
import {CalendarYearComponent} from '../../../../UI-palette/calendar/year/calendar.year.component';
import {CalendarDayComponent} from '../../../../UI-palette/calendar/day/calendar.day.component';
import {CalendarMonthComponent} from '../../../../UI-palette/calendar/month/calendar.month.component';
import {NgModule} from '@angular/core';

export const TimetableRoutes: Routes = [
  {path: '', component: CalendarYearComponent},
  {path: ':year_id/:month_id', component: CalendarMonthComponent},
  {path: ':year_id/:month_id/:day_id', component: CalendarDayComponent},
  {path: 's/:stud_id/:year_id/:month_id', component: CalendarMonthComponent},
  {path: 's/:stud_id/:year_id/:month_id/:day_id', component: CalendarDayComponent},
  // {path: 'instructor/', component: },
  // {path: 'admin', component:},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(TimetableRoutes)],
  exports: [RouterModule]
})
export class TimetableRouting {
}
