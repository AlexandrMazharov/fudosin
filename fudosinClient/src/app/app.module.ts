import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {CreateUserComponent} from './components/create-user/create-user.component';
import {CabinetModule} from './modules/cabinet/cabinet.module';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {PageFooterModule} from './modules/cabinet/cabinet/page-footer/page-footer.module';
import {AccountManagementModule} from './modules/account-management/account-management.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {PersonDetailComponent} from './components/person-detail/person-detail/person-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    ResetPasswordComponent,
    PersonDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    CabinetModule,
    PageFooterModule,
    CabinetModule,
    AccountManagementModule,
    MatCheckboxModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
