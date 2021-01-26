import {Routes} from '@angular/router';
import {AttendMonthComponent} from '../../pages/attend/attend-month/attend-month.component';
import {AttendYearComponent} from '../../pages/attend/attend-year/attend-year.component';

export const studentAttendRoutes: Routes = [
  {path: 'year/:year_id', component: AttendYearComponent},
  {path: ':year_id/month/:month_id', component: AttendMonthComponent},
  {path: '**', component: AttendYearComponent},
];
