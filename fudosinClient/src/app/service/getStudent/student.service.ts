import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private visit = 'visit/';

  constructor(private http: HttpClient) { }

  getLessonsMonth(idStudent: number): Observable<any> {

  }

  getLessonsDay(idStudent: number): Observable<any> {

  }

  getVisitsByStudent(id: number): Observable<any>{
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(URL + id, );
  }
}
