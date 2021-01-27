import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Role} from "../../models/role.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url = 'http://localhost:8080/role';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getRole(name: string): Observable<Role> {
    const url = `${this.url}/${name}`;
    return this.http.get<Role>(url);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url);
  }

}
