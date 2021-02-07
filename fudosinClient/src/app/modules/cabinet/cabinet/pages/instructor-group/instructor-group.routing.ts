import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GroupMainComponent} from '../../../../UI-palette/instructor-groups/group-main/group-main.component';
import {GroupDetailedComponent} from '../../../../UI-palette/instructor-groups/group-detailed/group-detailed.component';
import {GroupTimeComponent} from '../../../../UI-palette/instructor-groups/group-time/group-time.component';

export const InstructorGroupsRoutes: Routes = [
  {path: '', component: GroupMainComponent},
  {path: '1', component: GroupDetailedComponent},
  {path: '2', component: GroupTimeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(InstructorGroupsRoutes)],
  exports: [RouterModule]
})
export class InstructorGroupRouting {
}
