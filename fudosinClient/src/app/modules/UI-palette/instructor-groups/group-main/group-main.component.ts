import {Component, OnInit} from '@angular/core';
import {InstructorDictionary} from '../../services/instructor.dictionary';
import {InstructorHttpService} from '../../../../service/personalities/instructor-http.service';
import {TokenStorageService} from '../../../../service/token-storage/token-storage.service';

@Component({
  selector: 'app-group-main',
  templateUrl: './group-main.component.html',
  styleUrls: ['./group-main.component.less']
})
export class GroupMainComponent implements OnInit {

  private d = new InstructorDictionary();
  private choosenDomain = '';

  public groups: string[][] = [];

  constructor(private instructorHttp: InstructorHttpService, private token: TokenStorageService) {
    // this.instructorHttp.getGroups(this.token.getPerson().id).subscribe(groups => {
    //   this.groups = groups;
    // });
  }

  ngOnInit(): void {
  }

  chooseDomain(domain: string): void {
    this.choosenDomain = domain.toLowerCase() === this.d.domains.aikido ? this.d.domains.aikido :
      (domain.toLowerCase() === this.d.domains.kobudo ? this.d.domains.kobudo : this.d.domains.jiu_jitsu);
  }

  reject(): void {

  }

  create(): void {

  }

  save(): void {

  }

}
