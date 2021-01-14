import { Component, OnInit } from '@angular/core';
import { Person } from './models/person.model';
import { Role } from './models/role.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  person: Person = new Person();
  roles: Role[] = [
    new Role(0, 'STUDENT'),
    new Role(1, 'PARENT'),
  ]

  ngOnInit() {
    this.person.roles = this.roles;
  }

}
