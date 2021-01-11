import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CabinetComponent} from './cabinet/cabinet.component';
import {SecondaryBtnModule} from '../../ui/button/secondary-btn/secondary-btn.module';
import {HeaderComponent} from './cabinet/header/header.component';
import {LogoModule} from '../../ui/logo/logo.module';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {CabinetLogoComponent} from './cabinet/cabinet-logo/cabinet-logo.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [CabinetComponent, HeaderComponent, CabinetLogoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    SecondaryBtnModule,
    LogoModule,
    RouterModule,
  ],
  exports: [
    CabinetComponent
  ]
})
export class CabinetModule {
}
