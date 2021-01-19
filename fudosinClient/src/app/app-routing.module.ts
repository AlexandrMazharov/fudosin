import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {CreateUserComponent} from './components/create-user/create-user.component';
import {CabinetLogoComponent} from './modules/cabinet/cabinet/cabinet-logo/cabinet-logo.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {AccountManagementComponent} from './modules/account-management/account-management/account-management.component';
import {PersonDetailComponent} from './components/person-detail/person-detail/person-detail.component';

export const appRoutes: Routes = [
  {path: 'account_management', component: AccountManagementComponent},
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'lk', component: CabinetLogoComponent},
  {path: 'reset', component: ResetPasswordComponent},
  {path: 'reg', component: CreateUserComponent},
  {path: 'detail/:id', component: PersonDetailComponent}
  // {path: '**', component: CabinetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
