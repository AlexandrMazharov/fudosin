import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavService} from '../nav-bar/nav-bar.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less']
})
export class PageHeaderComponent implements OnInit {

  public title = '';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.title = NavService.getTitle(this.router.url);
    this.title = this.title.toLowerCase();
    this.title = this.title[0].toUpperCase() + this.title.slice(1);
  }

}
