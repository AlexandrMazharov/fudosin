import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CabinetComponent} from './cabinet/cabinet.component';
import {HeaderComponent} from './cabinet/header/header.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {UiElementsModule} from '../ui-elements/ui-elements.module';
import {NavBarModule} from './cabinet/nav-bar/nav-bar.module';
import {TimetableModule} from './cabinet/pages/timetable/timetable.module';
import {AttendModule} from './cabinet/pages/attend/attend.module';
import {MainModule} from './cabinet/pages/main/main.module';


@NgModule({
  declarations: [CabinetComponent, HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule,
    NavBarModule,
    UiElementsModule,
    TimetableModule,
    AttendModule,
    MainModule
  ],
  exports: [
    CabinetComponent
  ]
})
export class CabinetModule {
}
