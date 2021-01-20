import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../../service/token-storage/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn = false;
  public rolesExample: string[] | undefined;
  @Input() username: string | undefined;
  public publicRoles: string | undefined = '';

  @Input()
  set roles(roles: string[]) {
    this.rolesExample = roles;
    if (roles.length > 0) {
      this.publicRoles = '(';
      if (roles.includes('ROLE_STUDENT')) {
        this.publicRoles = this.publicRoles + 'Ученик ';
      }
      if (roles.includes('ROLE_PARENT')) {
        this.publicRoles = this.publicRoles + 'Родитель ';
      }
      if (roles.includes('ROLE_INSTRUCTOR')) {
        this.publicRoles = this.publicRoles + 'Инструктор ';
      }
      if (roles.includes('ROLE_ADMIN')) {
        this.publicRoles = this.publicRoles + 'Администратор ';
      }
      this.publicRoles = this.publicRoles + ') ';
    }
  }

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getPerson()) {
      this.isLoggedIn = true;
    }
  }

  signOut(): void {
    window.location.reload();
    this.tokenStorageService.signOut();

  }

  forgotPass(): void {
    this.router.navigate(['/reset']);
  }
}
