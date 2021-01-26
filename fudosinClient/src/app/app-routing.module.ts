import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {CreateUserComponent} from './components/create-user/create-user.component';
import {StudentComponent} from './modules/cabinet/cabinet/student/student.component';
import {CabinetComponent} from './modules/cabinet/cabinet/cabinet.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {RegGuard} from './guards/reg.guard';

export const appRoutes: Routes = [
  {path: '', component: CabinetComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'reg', component: CreateUserComponent, canActivate: [RegGuard]},
      // {path: 'lk', }, // fix it!!
      {path: 'reset', component: ResetPasswordComponent},
      {path: 'student', component: StudentComponent, loadChildren: './modules/cabinet/cabinet/student/student.module#StudentModule'},
      {path: '**', component: LoginComponent},
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
