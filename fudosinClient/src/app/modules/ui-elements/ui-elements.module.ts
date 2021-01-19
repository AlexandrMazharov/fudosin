import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SecondaryBtnComponent} from './secondary-btn/secondary-btn.component';
import {PrimaryBtnComponent} from './primary-btn/primary-btn.component';
import {LogoComponent} from './logo/logo.component';



@NgModule({
  declarations: [SecondaryBtnComponent, PrimaryBtnComponent, LogoComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SecondaryBtnComponent,
    PrimaryBtnComponent,
    LogoComponent
  ]
})
export class UiElementsModule { }
