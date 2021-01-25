import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Person} from '../../models/person.model';
import {tap} from 'rxjs/operators';

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
    return this.http.get<Person>(url);
  }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.url);
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.url, person, this.httpOptions);
  }

  deletePerson(person: Person | number): Observable<any> {
    const id = typeof person === 'number' ? person : person.id;
    const url = `${this.url}/${id}`;
    return this.http.delete(url,   { responseType: 'text' });

  }

  updatePerson(person: Person): Observable<any> {
    return this.http.put(this.url + '/upd/' + person.id, person, this.httpOptions);
  }
}
