import {Routes} from '@angular/router';
import {CalendarYearComponent} from '../../../../UI-palette/calendar/year/calendar.year.component';
import {CalendarMonthComponent} from '../../../../UI-palette/calendar/month/calendar.month.component';

export const studentAttendRoutes: Routes = [
  {path: ':year_id', component: CalendarYearComponent},
  {path: ':year_id/:month_id', component: CalendarMonthComponent},
  {path: '**', component: CalendarYearComponent},
];
