import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InstructorGroupRouting} from './instructor-group.routing';
import {PageHeaderModule} from '../../page-header/page-header.module';
import {InstructorGroupComponent} from './instructor-group.component';
import {InstructorGroupPaletteModule} from '../../../../UI-palette/instructor-groups/instructor-group-palette.module';


@NgModule({
  declarations: [InstructorGroupComponent],
  imports: [
    CommonModule,
    InstructorGroupRouting,
    InstructorGroupPaletteModule,
    PageHeaderModule,
  ]
})
export class InstructorGroupModule {
}
