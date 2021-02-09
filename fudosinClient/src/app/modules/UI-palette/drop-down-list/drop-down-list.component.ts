import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InstructorDictionary} from '../services/instructor.dictionary';

@Component({
  selector: 'app-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.less']
})
export class DropDownListComponent implements OnInit {

  public d = new InstructorDictionary();

  @Input() list: string[];
  @Input() type = this.d.typeOfListWorking.show;
  public headerItem = '';
  public listOpened = false;

  @Output() add: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.list = [];
  }

  ngOnInit(): void {
    if (this.list.length !== 0) {
      this.headerItem = this.list[0];
    } else {
      this.headerItem = '';
    }
  }

  openList(): void {
    this.listOpened = !this.listOpened;
  }

  chooseItem(choosen: number): void {
    this.headerItem = this.list[choosen];
    this.openList();
    if (this.type === this.d.typeOfListWorking.addShow) {
      this.add.emit(this.headerItem);
      this.deleteItem(choosen, this.list);
      if (this.list.length !== 0) {
        this.headerItem = this.list[0];
      } else {
        this.headerItem = '';
      }
    }
  }

  private deleteItem(id: number, massive: any[]): void {
    massive.splice(id, 1);
  }

}
