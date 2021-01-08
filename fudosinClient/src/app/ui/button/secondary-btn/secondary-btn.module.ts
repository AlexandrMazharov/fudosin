import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SecondaryBtnComponent} from './secondary-btn/secondary-btn.component';



@NgModule({
  declarations: [SecondaryBtnComponent],
  imports: [
    CommonModule
  ],
  exports : [SecondaryBtnComponent]
})
export class SecondaryBtnModule { }
