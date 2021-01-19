import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountManagementService} from '../../../modules/account-management/account-management.service';
import {Person} from '../../../models/person.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.less']
})
export class PersonDetailComponent implements OnInit {

  person!: Person;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountManagementService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPerson();
  }

  getPerson(): void {
    /*const id = +this.route.snapshot.paramMap.get('id');*/
    this.accountService.getPerson(2)
      .subscribe(person => this.person = person);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.accountService.updatePerson(this.person)
      .subscribe(() => this.goBack());
  }
}
