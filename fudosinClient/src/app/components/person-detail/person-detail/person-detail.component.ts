import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountManagementService} from '../../../modules/account-management/account-management.service';
import {Person} from '../../../models/person.model';
import {Location} from '@angular/common';
import {RoleService} from '../../../modules/account-management/role.service';
import {Role} from '../../../models/role.model';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.less']
})
export class PersonDetailComponent implements OnInit {

  person!: Person;
  allRoles: Role [] = [];

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountManagementService,
    private roleService: RoleService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getRoles();
    this.getPerson();
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe(res => {
      this.allRoles = Object.values(res);
      console.log(Array.isArray(this.allRoles));
    });
  }

  getPerson(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.accountService.getPerson(id)
      .subscribe(person => {
        this.person = person;
        console.log(person);
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.accountService.updatePerson(this.person)
      .subscribe(() => this.goBack());
  }
// эти методы для теста. переписать как нужно
  addAdminRole() {
    this.accountService.setRole(this.person, 'ADMIN').subscribe(data => console.log(data));
  }

  addInstructorRole() {
    this.accountService.setRole(this.person, 'INSTRUCTOR').subscribe(data => console.log(data));
  }

  addStudentRole() {
    this.accountService.setRole(this.person, 'STUDENT').subscribe(data => console.log(data));
  }

  addParentRole() {
    this.accountService.setRole(this.person, 'PARENT').subscribe(data => console.log(data));
  }
}
