import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Person} from '../../models/person.model';
import {map} from 'rxjs/operators';
import {Role} from "../../models/role.model";


@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {
  private url = 'http://localhost:8080/person';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getPerson(id: number): Observable<Person> {
    const url = `${this.url}/${id}`;
    return this.http.get<Person>(url).pipe(map(res => new Person().deserialize(res)));
  }

  getPersons(): Observable<any> {
    return this.http.get(this.url).pipe(map(res => new Person().deserialize(res)));
  }

  deletePerson(person: Person | number): Observable<any> {
    const id = typeof person === 'number' ? person : person.id;
    const url = `${this.url}/${id}`;
    return this.http.delete(url, {responseType: 'text'});

  }

  private personToObject(p: Person): any {
    return {
      id: p.id,
      firstName: p.firstName,
      secondName: p.secondName,
      lastName: p.lastName,
      telephone: p.telephone,
      parentId: p.parentId,
      email: p.email,
      birthDay: p.birthDay,
      userRoles: p.userRoles,
      password: p.password,
      username: p.username,
      degree: p.degree,
    };
  }

  updatePerson(person: Person): Observable<any> {
    return this.http.put(this.url + '/upd/' + person.id, this.personToObject(person), this.httpOptions);
  }

  setRole(person: Person, role: string): Observable<any> {
    return this.http.post(this.url + '/upd/' + person.id + '/' + role,
      this.httpOptions
    );
  }


  removeRole(person: Person, role: string): Observable<any> {
    return this.http.post(this.url + '/remove/' + person.id + '/' + role, this.httpOptions);
  }
}
