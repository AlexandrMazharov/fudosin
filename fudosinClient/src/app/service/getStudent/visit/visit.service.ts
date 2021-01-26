import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const URL = 'http://localhost:8080/visit/';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(private http: HttpClient) { }

  getVisitsByStudent(id: number ): Observable<any>{
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(URL + id, );
}
}
