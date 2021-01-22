import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {CreateUserComponent} from './components/create-user/create-user.component';
import {StudentComponent} from './modules/cabinet/cabinet/student/student.component';
import {CabinetComponent} from './modules/cabinet/cabinet/cabinet.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';

export const appRoutes: Routes = [
  {path: '', component: CabinetComponent},
  {path: 'reset', component: ResetPasswordComponent},
  {path: '', component: CabinetComponent},
  {path: 'login', component: CabinetComponent, children: [
      {path: '**', component: LoginComponent}
    ]},
  {path: 'lk', component: CabinetComponent, children: [
      {path: 'student', component: StudentComponent, loadChildren: './modules/cabinet/cabinet/student/student.module#StudentModule'}
    ]},
  {path: 'reg', component: CreateUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
