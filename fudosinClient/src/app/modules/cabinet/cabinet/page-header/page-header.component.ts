import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavService} from '../nav-bar/nav-bar.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less']
})
export class PageHeaderComponent implements OnInit {

  public title: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.title = '';
    this.activatedRoute.children[0].params.subscribe(p => {
      this.title = p.link;
    });
  }

  ngOnInit(): void {
    this.title = NavService.getTitle(this.title).toLowerCase();
    this.title = this.title[0].toUpperCase() + this.title.slice(1);
  }

}
