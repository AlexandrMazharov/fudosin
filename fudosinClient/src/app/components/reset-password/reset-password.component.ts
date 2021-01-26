import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent implements OnInit {
  form: any = {};
  email: string | undefined;
  statusMessage = '';

  constructor(private  authService: AuthService) {
  }

  ngOnInit(): void {
  }

  resetPassword(emailForm: NgForm): void {
    const email = emailForm.value.email;
    if (email) {
      this.authService.resetPassword(email).subscribe(data => {
        console.log(data);
        this.statusMessage = data;

      });
    }

  }
}
