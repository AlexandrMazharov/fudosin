import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {CreateUserComponent} from './components/create-user/create-user.component';
// import {PageHeaderComponent} from './modules/cabinet/cabinet/page-header/page-header.component';
import {StudentComponent} from './modules/cabinet/cabinet/student/student.component';
import {CabinetComponent} from './modules/cabinet/cabinet/cabinet.component';

export const appRoutes: Routes = [
  {path: 'login', component: CabinetComponent, children: [
      {path: '**', component: LoginComponent}
    ]},
  {path: 'lk', component: CabinetComponent, children: [
      // {path: '', component: PageHeaderComponent},
      {path: 'student/:link', component: StudentComponent, loadChildren: './modules/cabinet/cabinet/student/student.module#StudentModule'}
    ]},
  {path: 'reg', component: CreateUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
