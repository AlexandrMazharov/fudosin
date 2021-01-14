import { Component, Input, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role.model';
import { NavService } from './nav-bar.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {

  nav_items: string[];
  nav_links: string[];

  @Input() roles!: Role[] | string[]; //why doesn't it work?! (without "!" mark; constructor is required, but I needn't a constructor) 

  constructor() { 
    this.nav_items = NavService.getItems(this.roles);
    this.nav_links = NavService.getLinks(this.roles);
  }
  
  ngOnInit(): void {
    console.log('Navigation Bar is created!');
    this.nav_items = NavService.getItems(this.roles);
    this.nav_links = NavService.getLinks(this.roles);
  }

  getLink(num: number) {
    return `student/${this.nav_links[num]}`;
  }

}
