import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {studentAttendRoutes} from './pages/student-attend.routing';
import {studentMainRoutes} from './pages/student-main.routing';
import {studentTimetableRoutes} from './pages/student-timetable.routing';

export const studentRoutes: Routes = [
  { path: '', redirectTo: 'timetable', pathMatch: 'full' },
  { path: 'attend', children: studentAttendRoutes },
  { path: 'main', children: studentMainRoutes },
  { path: 'timetable', children: studentTimetableRoutes },
  { path: '**', redirectTo: 'timetable', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(studentRoutes)],
  exports: [RouterModule]
})
export class StudentRouting {
}
