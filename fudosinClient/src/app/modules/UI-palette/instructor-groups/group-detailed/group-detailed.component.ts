import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {InstructorHttpService} from '../../../../service/personalities/instructor-http.service';
import {InstructorDictionary} from '../../services/instructor.dictionary';

@Component({
  selector: 'app-group-detailed',
  templateUrl: './group-detailed.component.html',
  styleUrls: ['./group-detailed.component.less']
})
export class GroupDetailedComponent implements OnInit {

  public d = new InstructorDictionary();
  private listCopy: string[] = [];
  public list: string[] = [];
  public addedStudents: string[] = [];

  constructor(private instructorHttp: InstructorHttpService) {
    // this.getList().subscribe(list => this.list = list);
    this.listCopy = this.getList();
    this.list = new Array().concat(this.listCopy);
  }

  ngOnInit(): void {
  }

  // private getList(): Observable<string[]> {
  //   return this.instructorHttp.getStudentsOfGroup(id);
  // }

  getList(): string[] {
    return ['Иннокентий А.В.', 'Владилович А.К.', 'Карамзонов К.К.'];
  }

  addStudent($event: string): void {
    this.addedStudents.push($event);
  }

  reject(): void {

  }

  create(): void {

  }

  save(): void {

  }

}
