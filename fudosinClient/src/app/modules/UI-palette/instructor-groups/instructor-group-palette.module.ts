import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GroupMainComponent} from './group-main/group-main.component';
import {GroupDetailedComponent} from './group-detailed/group-detailed.component';
import {GroupTimeComponent} from './group-time/group-time.component';
import {RouterModule} from '@angular/router';
import {InstructorHttpService} from '../../../service/personalities/instructor-http.service';
import {DropDownListModule} from '../drop-down-list/drop-down-list.module';



@NgModule({
  declarations: [GroupMainComponent, GroupDetailedComponent, GroupTimeComponent],
  imports: [
    CommonModule,
    RouterModule,
    DropDownListModule
  ],
  providers: [InstructorHttpService]
})
export class InstructorGroupPaletteModule { }
