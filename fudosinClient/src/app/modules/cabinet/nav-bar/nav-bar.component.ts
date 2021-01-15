import {Component, Input, OnInit} from '@angular/core';
import {Role} from 'src/app/models/role.model';
import {NavService} from './nav-bar.service';
import {TokenStorageService} from "../../../service/token-storage/token-storage.service";

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {

  nav_items: string[];
  nav_links: string[];

  // @Input() roles!: Role[] | string[]; //why doesn't it work?! (without "!" mark; constructor is required, but I needn't a constructor)

  constructor(private  tokenStorageService: TokenStorageService) {
    const user = this.tokenStorageService.getPerson();
    this.roles = user.roles;

    console.log(this.roles);
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
