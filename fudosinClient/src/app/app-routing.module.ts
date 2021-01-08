import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CabinetComponent} from './modules/home/cabinet/cabinet.component';
import {LoginComponent} from './components/login/login.component';
import {CreateUserComponent} from './components/create-user/create-user.component';
import {CabinetLogoComponent} from './modules/home/cabinet/cabinet-logo/cabinet-logo.component';


export const appRoutes: Routes = [
  {path: '', component: CabinetComponent},
  {path: 'login', component: LoginComponent},
  {path: 'lk', component: CabinetLogoComponent},
  {path: 'reg', component: CreateUserComponent},
  {path: '**', component: CabinetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
