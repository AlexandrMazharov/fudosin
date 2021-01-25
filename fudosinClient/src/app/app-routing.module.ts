import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {CreateUserComponent} from './components/create-user/create-user.component';
import {StudentComponent} from './modules/cabinet/cabinet/student/student.component';
import {CabinetComponent} from './modules/cabinet/cabinet/cabinet.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {ParentComponent} from './modules/cabinet/cabinet/parent/parent.component';
import {PageHeaderComponent} from './modules/cabinet/cabinet/page-header/page-header.component';

export const appRoutes: Routes = [
  {path: '', component: CabinetComponent, children: [
      {path: '', component: LoginComponent},
      {path: 'reg', component: CreateUserComponent},
      {path: 'lk', component: PageHeaderComponent},
      {path: 'reset', component: ResetPasswordComponent},
      // {path: 'login/:login', component: LoginComponent},
      {path: 'student', component: StudentComponent, loadChildren: './modules/cabinet/cabinet/student/student.module#StudentModule'},
      {path: '**', component: PageHeaderComponent},
    ]},

];
export const superRouting: Routes = [
  {path: '', component: CabinetComponent},
  {path: 'login', component: CabinetComponent, children: [
      {path: '**', component: LoginComponent}
    ]},
  {path: 'lk', component: CabinetComponent, children: [
      {path: 'student', component: StudentComponent, loadChildren: './modules/cabinet/cabinet/student/student.module#StudentModule'},
      {path: 'parent', component: ParentComponent, loadChildren: './modules/cabinet/cabinet/parent/parent.module#ParentModule'},
      // {path: 'instructor', component: InstructorComponent, loadChildren: './modules/cabinet/cabinet/student/student.module#StudentModule'},
      // {path: 'admin', component: AdminComponent, loadChildren: './modules/cabinet/cabinet/student/student.module#StudentModule'}
    ]},
  {path: 'reset', component: ResetPasswordComponent},
  {path: 'reg', component: CreateUserComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
