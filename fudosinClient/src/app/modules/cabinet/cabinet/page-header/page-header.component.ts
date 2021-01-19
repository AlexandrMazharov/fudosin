import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less']
})
export class PageHeaderComponent implements OnInit {

  public title: string;

  constructor() {
    this.title = '';
  }

  ngOnInit(): void {
  }

}
