import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-secondary-btn',
  templateUrl: './secondary-btn.component.html',
  styleUrls: ['./secondary-btn.component.less']
})
export class SecondaryBtnComponent implements OnInit {
  @Input() title: string | undefined ;
  constructor() { }

  ngOnInit(): void {
  }

}
