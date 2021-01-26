import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from './parent.component';
import {ParentRouting} from './parent.routing';



@NgModule({
  declarations: [ParentComponent],
  imports: [
    CommonModule,
    ParentRouting,
  ]
})
export class ParentModule { }
