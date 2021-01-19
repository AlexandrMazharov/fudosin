import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CabinetComponent} from './cabinet/cabinet.component';
import {HeaderComponent} from './cabinet/header/header.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {PageHeaderComponent} from './cabinet/page-header/page-header.component';
import {RouterModule} from '@angular/router';
import {UiElementsModule} from '../ui-elements/ui-elements.module';
import {StudentModule} from './cabinet/student/student.module';


@NgModule({
  declarations: [CabinetComponent, HeaderComponent, PageHeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule,
    UiElementsModule,
    StudentModule
  ],
  exports: [
    CabinetComponent
  ]
})
export class CabinetModule {
}
