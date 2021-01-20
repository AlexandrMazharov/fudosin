import {Component, OnInit} from '@angular/core';
import {NavService} from './nav-bar.service';
import {TokenStorageService} from '../../service/token-storage/token-storage.service';
import {Role} from '../../models/role.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {

  navItems: string[];
  navLinks: string[];
  roles: Role[] | undefined | string[];

  constructor(private  tokenStorageService: TokenStorageService) {
    const user = this.tokenStorageService.getPerson();
    this.roles = user.roles;

    this.navItems = NavService.getItems(this.roles);
    this.navLinks = NavService.getLinks(this.roles);
  }

  ngOnInit(): void {
    this.navItems = NavService.getItems(this.roles);
    this.navLinks = NavService.getLinks(this.roles);
  }

  getLink(num: number): string {
    return `student/${this.navLinks[num]}`;
  }

}
