import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagementComponent } from './account-management/account-management.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {PageHeaderModule} from '../cabinet/cabinet/page-header/page-header.module';






@NgModule({
  declarations: [AccountManagementComponent],
  imports: [
    PageHeaderModule,
    CommonModule,
    BrowserModule,
    RouterModule
  ],
  exports: [AccountManagementComponent]
})
export class AccountManagementModule { }
