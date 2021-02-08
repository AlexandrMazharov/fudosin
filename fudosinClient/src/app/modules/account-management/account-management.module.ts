import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagementComponent } from './account-management/account-management.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [AccountManagementComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ],
  exports: [AccountManagementComponent]
})
export class AccountManagementModule { }
