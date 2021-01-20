import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavService} from '../nav-bar/nav-bar.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less']
})
export class PageHeaderComponent implements OnInit {

  public title: string = '';

  constructor() {
    this.title = NavService.getTitle(document.location.toString());
  }

  ngOnInit(): void {
    this.title = this.title.toLowerCase();
    this.title = this.title[0].toUpperCase() + this.title.slice(1);
  }

}
