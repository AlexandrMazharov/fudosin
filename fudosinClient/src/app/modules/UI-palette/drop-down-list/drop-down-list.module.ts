import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropDownListComponent} from './drop-down-list.component';



@NgModule({
  declarations: [DropDownListComponent],
  exports: [
    DropDownListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DropDownListModule { }
