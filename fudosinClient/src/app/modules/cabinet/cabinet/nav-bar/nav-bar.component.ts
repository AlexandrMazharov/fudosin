import {Component} from '@angular/core';
import {NavService} from './nav-bar.service';
import {TokenStorageService} from '../../../../service/token-storage/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent {

  navItems: string[];
  navLinks: string[];
  private roles: string[] | undefined;

  constructor(private  tokenStorageService: TokenStorageService) {
    const user = this.tokenStorageService.getPerson();
    this.roles = user.roles;
    this.navItems = NavService.getItems(this.roles);
    this.navLinks = NavService.getLinks(this.roles);
    console.log('Navigation Bar is created!');
  }

  getLink(num: number): string {
    return `${this.navLinks[num]}`;
  }

}
