import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'http://localhost:8080/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(AUTH_API + 'reset/' + email, {}, {responseType: 'text'});
  }

  login(credentials: any): Observable<any> {
    console.log(credentials.username);
    return this.http.post(AUTH_API + 'signin', {

      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  registerStudent(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  register(user: any): Observable<any> {
    const r = [];
    if (user.roles.includes('STUDENT')) {
      r.push('ROLE_STUDENT');
    }
    if (user.roles.includes('PARENT')) {
      r.push('ROLE_PARENT');
    }
    if (user.roles.includes('INSTRUCTOR')) {
      r.push('ROLE_INSTRUCTOR');
    }
    if (user.roles.includes('ADMIN')) {
      r.push('ROLE_ADMIN');
    }
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      role: r
    }, httpOptions);
  }


}
