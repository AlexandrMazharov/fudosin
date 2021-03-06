import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {CreateUserComponent} from './components/create-user/create-user.component';
import {CabinetComponent} from './modules/cabinet/cabinet/cabinet.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {AccountManagementComponent} from './modules/account-management/account-management/account-management.component';
import {PersonDetailComponent} from './components/person-detail/person-detail/person-detail.component';
import {RegGuard} from './guards/reg.guard';
import {TimetableComponent} from './modules/cabinet/cabinet/pages/timetable/timetable.component';
import {AttendComponent} from './modules/cabinet/cabinet/pages/attend/attend.component';
import {MainComponent} from './modules/cabinet/cabinet/pages/main/main.component';
import {InstructorGroupComponent} from './modules/cabinet/cabinet/pages/instructor-group/instructor-group.component';

export const appRoutes: Routes = [
  {path: '', component: CabinetComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'reg', component: CreateUserComponent, canActivate: [RegGuard]},
      {path: 'reset', component: ResetPasswordComponent},
      // tslint:disable-next-line:max-line-length
      {path: 'lk', children: [
          {path: '', redirectTo: 'timetable', pathMatch: 'full'},
          {path: 'account_management', component: AccountManagementComponent},
          {path: 'account_management/detail/:id', component: PersonDetailComponent},
          {path: 'timetable', component: TimetableComponent, loadChildren: './modules/cabinet/cabinet/pages/timetable/timetable.module#TimetableModule'},
          {path: 'attend', component: AttendComponent, loadChildren: './modules/cabinet/cabinet/pages/attend/attend.module#AttendModule'},
          {path: 'main', component: MainComponent, loadChildren: './modules/cabinet/cabinet/pages/main/main.module#MainModule'},
          {path: 'groups', component: InstructorGroupComponent, loadChildren: './modules/cabinet/cabinet/pages/instructor-group/instructor-group.module#InstructorGroupModule'},
        ]},
      {path: '**', component: LoginComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
