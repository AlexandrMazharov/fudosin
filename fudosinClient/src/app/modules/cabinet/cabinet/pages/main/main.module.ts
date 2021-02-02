import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {MainRouting} from './main.routing';
import {PageHeaderModule} from '../../page-header/page-header.module';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRouting,
    PageHeaderModule,
  ]
})
export class MainModule { }
