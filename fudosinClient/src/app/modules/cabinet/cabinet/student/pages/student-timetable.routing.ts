import {Routes} from '@angular/router';
import {CalendarYearComponent} from '../../../../UI-palette/calendar/year/calendar.year.component';
import {CalendarMonthComponent} from '../../../../UI-palette/calendar/month/calendar.month.component';
import {CalendarDayComponent} from '../../../../UI-palette/calendar/day/calendar.day.component';

export const studentTimetableRoutes: Routes = [
  {path: ':year_id', component: CalendarYearComponent},
  {path: ':year_id/:month_id', component: CalendarMonthComponent},
  {path: ':year_id/:month_id/:day_id', component: CalendarDayComponent},
  {path: '**', component: CalendarYearComponent},
];
