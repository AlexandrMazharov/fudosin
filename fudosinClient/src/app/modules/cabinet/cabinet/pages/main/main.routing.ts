import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

export const MainRoutes: Routes = [
      // {path: ':page_id', component: },
      // {path: '**', component: StudentMainComponent},
];

@NgModule({
  imports: [RouterModule.forChild(MainRoutes)],
  exports: [RouterModule]
})
export class MainRouting {
}
