import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CabinetComponent} from './cabinet/cabinet.component';
import {HeaderComponent} from './cabinet/header/header.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {UiElementsModule} from '../ui-elements/ui-elements.module';
import {NavBarModule} from './cabinet/nav-bar/nav-bar.module';
import {StudentModule} from './cabinet/student/student.module';
import {ParentModule} from './cabinet/parent/parent.module';


@NgModule({
  declarations: [CabinetComponent, HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule,
    NavBarModule,
    UiElementsModule,
    StudentModule,
    ParentModule,
  ],
  exports: [
    CabinetComponent
  ]
})
export class CabinetModule {
}
