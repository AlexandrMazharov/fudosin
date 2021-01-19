import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar.component';

@NgModule({
    declarations: [NavBarComponent],
    imports: [
        RouterModule,
        CommonModule,
    ],
    exports: [NavBarComponent]
})
export class NavBarModule {}
