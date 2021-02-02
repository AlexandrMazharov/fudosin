import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../service/token-storage/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.less']
})
export class CabinetComponent implements OnInit {

  public roles: string[];
  isLoggedIn = false;

  showStudentBoard = false;
  showParentBoard = false;
  showAdminBoard = false;
  showInstructorBoard = false;
  username: string | undefined;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
    this.roles = [];
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getPerson();
      this.roles = user.roles;
      this.showStudentBoard = this.roles.includes('ROLE_STUDENT');
      this.showParentBoard = this.roles.includes('ROLE_PARENT');
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showInstructorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
      // this.router.navigate(['/lk']);
    } else {
      // this.router.navigate(['/login']);
    }
  }
}
