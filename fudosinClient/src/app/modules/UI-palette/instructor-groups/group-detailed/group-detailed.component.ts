import {Component, OnInit} from '@angular/core';
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
  public listCopy: string[] = [];
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

  deleteStudent(student: string): void {
    this.list.push(student);
    let id = 0;
    for (let i = 0; i < this.addedStudents.length; ++i) {
      if (student === this.addedStudents[i]) {
        break;
      }
      ++id;
    }
    this.addedStudents.splice(id, 1);
  }

  reject(): void {

  }

  create(): void {

  }

  save(): void {

  }

}
