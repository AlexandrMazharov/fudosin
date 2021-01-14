import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { NavService } from './nav-bar.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {

  nav_items: string[];
  nav_links: string[];

  @Input() person!: Person; //why doesn't it work?! (without "!" mark; constructor is required, but I needn't a constructor) 

  constructor() { 
    this.nav_items = NavService.getItems(this.person.roles);
    this.nav_links = NavService.getLinks(this.person.roles);
  }
  
  ngOnInit(): void {
    console.log('Navigation Bar is created!');
    this.nav_items = NavService.getItems(this.person.roles);
    this.nav_links = NavService.getLinks(this.person.roles);
  }

  getLink(num: number) {
    return `student/${this.nav_links[num]}`;
  }

}
