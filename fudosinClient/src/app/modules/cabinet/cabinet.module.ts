import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CabinetComponent} from './cabinet/cabinet.component';
import {HeaderComponent} from './cabinet/header/header.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { NavBarModule } from './nav-bar/nav-bar.module';
import {UiElementsModule} from '../ui-elements/ui-elements.module';
import {StudentModule} from './cabinet/student/student.module';
import {PageHeaderComponent} from './cabinet/page-header/page-header.component';
import {ParentModule} from './cabinet/parent/parent.module';


@NgModule({
  declarations: [CabinetComponent, HeaderComponent, PageHeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule,
    NavBarModule,
    UiElementsModule,
    StudentModule,
    ParentModule
  ],
  exports: [
    CabinetComponent
  ]
})
export class CabinetModule {
}
