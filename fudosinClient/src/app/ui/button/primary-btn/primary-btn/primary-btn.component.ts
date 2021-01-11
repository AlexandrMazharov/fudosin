import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-primary-btn',
  templateUrl: './primary-btn.component.html',
  styleUrls: ['./primary-btn.component.less']
})
export class PrimaryBtnComponent implements OnInit {
  @Input() title: string | undefined ;
  constructor() { }

  ngOnInit(): void {
  }

}
