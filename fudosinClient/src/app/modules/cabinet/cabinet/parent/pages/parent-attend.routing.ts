import {Routes} from '@angular/router';
import {CalendarMonthComponent} from '../../../../UI-palette/calendar/month/calendar.month.component';
import {CalendarYearComponent} from '../../../../UI-palette/calendar/year/calendar.year.component';

export const parentAttendRoutes: Routes = [
  {path: 'year/:year_id', component: CalendarYearComponent},
  {path: ':year_id/month/:month_id', component: CalendarMonthComponent},
  {path: '**', component: CalendarYearComponent},
];
