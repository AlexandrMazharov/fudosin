import {Component, OnInit} from '@angular/core';
import {AccountManagementService} from '../account-management.service';
import {Person} from '../../../models/person.model';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.less']
})
export class AccountManagementComponent implements OnInit {

  public persons = new Array<Person>();
  private person: Person | undefined;

  constructor(private accountService: AccountManagementService) {
  }

  getPersons(): void {
    this.accountService.getPersons()
      .subscribe(persons => this.persons = persons);
  }

  ngOnInit(): void {
    this.getPersons();
  }


  delete(person: Person): void {
    this.persons = this.persons.filter(p => p !== person);
    this.accountService.deletePerson(person).subscribe(data => console.log(data));
  }
}
