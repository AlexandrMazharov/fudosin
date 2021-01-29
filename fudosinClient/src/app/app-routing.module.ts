import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {CreateUserComponent} from './components/create-user/create-user.component';
import {StudentComponent} from './modules/cabinet/cabinet/student/student.component';
import {CabinetComponent} from './modules/cabinet/cabinet/cabinet.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {RegGuard} from './guards/reg.guard';
import {TimetableComponent} from './modules/cabinet/cabinet/pages/timetable/timetable.component';
import {AttendComponent} from "./modules/cabinet/cabinet/pages/attend/attend.component";
import {MainComponent} from "./modules/cabinet/cabinet/pages/main/main.component";

export const appRoutes: Routes = [
  {path: '', component: CabinetComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'reg', component: CreateUserComponent, canActivate: [RegGuard]},
      {path: 'reset', component: ResetPasswordComponent},
      {path: 'lk', component: StudentComponent, loadChildren: './modules/cabinet/cabinet/student/student.module#StudentModule'},
      {path: '**', component: LoginComponent},
    ]},

];

export const routes: Routes = [
  {path: '', component: CabinetComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'reg', component: CreateUserComponent, canActivate: [RegGuard]},
      {path: 'reset', component: ResetPasswordComponent},
      {path: 'lk', children: [
          {path: '', redirectTo: 'timetable', pathMatch: 'full'},
          {path: 'timetable', component: TimetableComponent, loadChildren: './modules/cabinet/cabinet/pages/timetable/timetable.module#TimetableModule'},
          {path: 'attend', component: AttendComponent, loadChildren: './modules/cabinet/cabinet/pages/attend/attend.module#AttendModule'},
          {path: 'main', component: MainComponent, loadChildren: './modules/cabinet/cabinet/pages/main/main.module#MainModule'},
        ]},
      {path: '**', component: LoginComponent},
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
