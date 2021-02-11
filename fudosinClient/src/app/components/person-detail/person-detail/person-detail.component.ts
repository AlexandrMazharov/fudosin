import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountManagementService} from '../../../modules/account-management/account-management.service';
import {Person} from '../../../models/person.model';
import {Location} from '@angular/common';
import {RoleService} from '../../../modules/account-management/role.service';
import {Role} from '../../../models/role.model';
import {Observable} from 'rxjs';

const INSTRUCTOR = 'INSTRUCTOR';
const ADMIN = 'ADMIN';
const STUDENT = 'STUDENT';
const PARENT = 'PARENT';

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
    private location: Location,
  ) {
  }


  ngOnInit(): void {
    this.getRoles();

    this.getPerson();
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe(res => {
      // this.allRoles = Object.values(res);
      this.allRoles = Object.values(res);

      console.log(this.allRoles[0]);
      console.log(this.allRoles);
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

  save(): Observable<any> {
    console.log(this.person);
    return this.accountService.updatePerson(this.person);
  }

  veryVeryVeryVeryVeryTotalSave(): void {
    this.save().subscribe(() => {

      this.goBack();
    });
  }

// эти методы для теста. переписать как нужно
  addAdminRole(): void {
    this.save().subscribe(() =>
      this.accountService.setRole(this.person, ADMIN).subscribe(data =>
        this.getPerson()
      )
    );
  }

  addInstructorRole(): void {
    this.save().subscribe(() =>
      this.accountService.setRole(this.person, INSTRUCTOR).subscribe(data =>
        this.getPerson()
      )
    );
  }

  addStudentRole(): void {
    this.save().subscribe(res =>
      this.accountService.setRole(this.person, STUDENT).subscribe(data =>
        this.getPerson()
      )
    );
  }

  addParentRole(): void {
    this.save().subscribe(res =>
      this.accountService.setRole(this.person, PARENT).subscribe(data =>
        this.getPerson()
      )
    );
  }

  removeAdminRole(): void {
    this.save().subscribe(res => {
      this.accountService.removeRole(this.person, 'ADMIN').subscribe(data => {
        this.getPerson();
      });
    });
  }

  removeInstructorRole(): void {
    this.save().subscribe(res => {
      this.accountService.removeRole(this.person, 'INSTRUCTOR').subscribe(data => {
        this.getPerson();
      });
    });
  }

  removeStudentRole(): void {
    this.save().subscribe(res => {
      this.accountService.removeRole(this.person, 'STUDENT').subscribe(data => {
        this.getPerson();
      });
    });
  }

  removeParentRole(): void {
    this.save().subscribe(res => {
      this.accountService.removeRole(this.person, 'PARENT').subscribe(data => {
        this.getPerson();
      });
    });
  }
}
