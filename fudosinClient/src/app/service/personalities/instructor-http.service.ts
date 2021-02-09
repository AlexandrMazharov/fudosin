import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Lesson} from '../../models/lesson.model';
import {forkJoin, Observable, range} from 'rxjs';
import {StudentParentDictionary} from '../../modules/UI-palette/services/student-parent.dictionary';
import {map} from 'rxjs/operators';
import {CalendarService} from '../../modules/UI-palette/services/calendar.service';


@Injectable({
  providedIn: 'root'
})
export class InstructorHttpService {

  private d = new StudentParentDictionary();

  constructor(private http: HttpClient) {
  }

  private getByPath(obj: any, path: string): any {
    const parts = path.split('.');
    let result = obj;
    for (let i = 0; i < parts.length; i++) {
      result = result[parts[i]];
      if (!result) {
        break;
      }
    }
    return result;
  }

  private getRoleId(idPerson: number, role: string): Observable<number> {
    return this.http.get<any>(this.d.URL.server + this.d.URL.person.url + idPerson + this.d.URL.person.role, {observe: 'body'}).pipe(
      map(roles => roles[`${role}`])
    );
  }

  // getGroups(idPerson: number): Observable<string[][]> {
  //
  // }

  // getStudentsOfGroup(idGroup: number): Observable<string[]> {
  //
  // }

}
