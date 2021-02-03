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
  studentChecked = false;
  parentChecked = false;
  trainerChecked = false;
  adminChecked = false;



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
      console.log();
    });
  }

  renderRoles(person: Person): void {
    for (let i in person.userRoles) {
      console.log(person.userRoles[i]);
      if (person.userRoles[i].name === 'ROLE_STUDENT') {
        this.studentChecked = true;
      }
      if (person.userRoles[i].name === 'ROLE_PARENT') {
        this.parentChecked = true;
      }
      if (person.userRoles[i].name === 'ROLE_INSTRUCTOR') {
        this.trainerChecked = true;
      }
      if (person.userRoles[i].name === 'ROLE_ADMIN') {
        this.adminChecked = true;
      }
    }
  }

  addRoles(): void {
    if (this.studentChecked) {
      this.addStudentRole();
    } else {
      this.removeStudentRole();
    }
    if (this.parentChecked) {
      this.addParentRole();
    } else {
      this.removeParentRole();
    }
    if (this.trainerChecked) {
      this.addInstructorRole();
    } else {
      this.removeInstructorRole();
    }
    if (this.adminChecked) {
      this.addAdminRole();
    } else {
      this.removeAdminRole();
    }
    console.log(this.person)
    this.renderRoles(this.person);
  }

  getPerson(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.accountService.getPerson(id)
      .subscribe(person => {
        this.person = person;
        this.renderRoles(person);
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
  addAdminRole(): void {
    this.accountService.setRole(this.person, 'ADMIN').subscribe(data => console.log(data));
  }

  addInstructorRole(): void {
    this.accountService.setRole(this.person, 'INSTRUCTOR').subscribe(data => console.log(data));
  }

  addStudentRole(): void {
    console.log('Add role');
    console.log('Student check: ' + this.studentChecked);
    this.accountService.setRole(this.person, 'STUDENT').subscribe(data => console.log(data));
  }

  addParentRole(): void {
    this.accountService.setRole(this.person, 'PARENT').subscribe(data => console.log(data));
  }

  removeAdminRole(): void {
    console.log('Remove role');
    console.log('Student check: ' + this.studentChecked);
    this.accountService.removeRole(this.person, 'ADMIN').subscribe(data => console.log(data));
  }

  removeInstructorRole(): void {
    this.accountService.removeRole(this.person, 'INSTRUCTOR').subscribe(data => console.log(data));
  }

  removeStudentRole(): void {
    this.accountService.removeRole(this.person, 'STUDENT').subscribe(data => console.log(data));
  }

  removeParentRole(): void {
    this.accountService.removeRole(this.person, 'PARENT').subscribe(data => console.log(data));
  }
}
