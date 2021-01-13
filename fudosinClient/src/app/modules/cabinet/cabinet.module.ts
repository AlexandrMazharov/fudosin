import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CabinetComponent} from './cabinet/cabinet.component';
import {HeaderComponent} from './cabinet/header/header.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {CabinetLogoComponent} from './cabinet/cabinet-logo/cabinet-logo.component';
import {RouterModule} from '@angular/router';
import {UiElementsModule} from '../ui-elements/ui-elements.module';


@NgModule({
  declarations: [CabinetComponent, HeaderComponent, CabinetLogoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule,
    UiElementsModule
  ],
  exports: [
    CabinetComponent
  ]
})
export class CabinetModule {
}
