import {Component, OnInit} from '@angular/core';
import {AccountManagementService} from '../account-management.service';
import {Person} from '../../../models/person.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.less']
})
export class AccountManagementComponent implements OnInit {

  public persons = new Array<Person>();
  public chunks = [] as Person[][];
  public currentChunk = 0;
  private person: Person |  undefined;
  public length: number | undefined;

  constructor(private accountService: AccountManagementService, public router: Router) {
  }

  currentPageRender(): string {
    let firstPos: string = this.currentChunk  + '1';
    let lastPos: string = this.currentChunk + 1 + '0';
    if (this.currentChunk === 0) {
      firstPos = '1';
    }
    if (this.currentChunk + 1 === this.chunks.length) {
      lastPos = this.persons.length + '';
    }
    return firstPos + ' - ' + lastPos;
  }

  increase(): void {
    if (this.currentChunk >= this.chunks.length - 1) {
      return;
    } else {
      this.currentChunk++;
    }
  }

  decrease(): void {
    if (this.currentChunk <= 0) {
      return;
    } else {
      this.currentChunk--;
    }
  }

  splitArr(arr: Person[]): any {
    const newArr = [] as any[][];
    newArr.push([]);
    for (let i = 0; i < arr.length; i++) {
      if (i % 10 === 0 && i !== 0) {
        newArr.push([]);
        newArr[newArr.length - 1].push(arr[i]);
      } else {
        newArr[newArr.length - 1].push(arr[i]);
      }
    }
    return newArr;
  }

  getPersons(): void {
    this.accountService.getPersons()
      .subscribe(persons => {
        this.persons = Object.values(persons);
        this.length = this.persons.length;
        this.chunks = this.splitArr(Object.values(persons));
      });
  }

  ngOnInit(): void {
    this.getPersons();
  }


  delete(person: Person): void {
    this.persons = this.persons.filter(p => p !== person);
    this.accountService.deletePerson(person).subscribe(data => console.log(data));
  }
}
