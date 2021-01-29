import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lesson} from '../../models/lesson.model';

const URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private visit = 'visit/';

  constructor(private http: HttpClient) { }

  // getLessonsMonth(idParent: number, year: number, month: number): Observable<Lesson[]> {
  //
  // }
  //
  // getLessonsDay(idParent: number, year: number, month: number, day: number): Observable<Lesson[]> {
  //
  // }
  //
  // getLessonsMonthStudent(idStudent: number, year: number, month: number): Observable<Lesson[]> {
  //
  // }
  //
  // getLessonsDayStudent(idStudent: number, year: number, month: number, day: number): Observable<Lesson[]> {
  //
  // }

  getVisitsByStudent(id: number): Observable<any>{
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(URL + id, );
  }
}
