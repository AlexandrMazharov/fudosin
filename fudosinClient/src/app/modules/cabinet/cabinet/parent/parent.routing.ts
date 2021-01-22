import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {parentTimetableRoutes} from './pages/parent-timetable.routing';
import {parentAttendRoutes} from './pages/parent-attend.routing';
import {parentMainRoutes} from './pages/parent-main.routing';

export const parentRoutes: Routes = [

  { path: '', children: parentTimetableRoutes },
  { path: 'attend', children: parentAttendRoutes },
  { path: 'main', children: parentMainRoutes },
  { path: 'timetable', children: parentTimetableRoutes },
];

@NgModule({
  imports: [RouterModule.forChild(parentRoutes)],
  exports: [RouterModule]
})
export class ParentRouting {
}
