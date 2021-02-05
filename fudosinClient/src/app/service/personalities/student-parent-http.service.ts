import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Lesson} from '../../models/lesson.model';
import {Observable, range} from 'rxjs';
import {StudentParentDictionary} from '../../modules/UI-palette/services/student-parent.dictionary';
import {filter, map} from 'rxjs/operators';
import {CalendarService} from '../../modules/UI-palette/services/calendar.service';


@Injectable({
  providedIn: 'root'
})
export class StudentParentService {

  private d = new StudentParentDictionary();
  private calendar = new CalendarService();

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

  private getGroupsId(idStudent: number): Observable<number[]> {
    return this.http.get<number[]>(this.d.URL.server + this.d.URL.student.student + idStudent + this.d.URL.student.group);
  }

  // do not delete, maybe it will help someday
  // getDayLessonsAttend(idPerson: number, year: number, month: number, day: number): Observable<Lesson[]> {
  //   return new Observable<Lesson[]>(subscriber => {
  //     this.getRoleId(idPerson, this.d.userRoles.student).subscribe(idStudent => {
  //       this.http.get<any>(this.d.URL.server + this.d.URL.visit.url +
  //         this.d.URL.visit.id + idStudent +
  //         this.d.URL.visit.from + this.calendar.setDateInMillsLeft(year, month, day) +
  //         this.d.URL.visit.to + this.calendar.setDateInMillsRight(year, month, day))
  //         .subscribe(visits => {
  //           const lessons = [];
  //           for (let i = 0; i < visits.length; ++i) {
  //             lessons.push(new Lesson(
  //               this.getByPath(visits[i], this.d.visitResponse.presence),
  //               this.getByPath(visits[i], this.d.visitResponse.pay),
  //               this.getByPath(visits[i], this.d.visitResponse.begin),
  //               this.getByPath(visits[i], this.d.visitResponse.end),
  //               this.getByPath(visits[i], this.d.visitResponse.place),
  //               this.getByPath(visits[i], this.d.visitResponse.title),
  //               idStudent
  //             ));
  //           }
  //           subscriber.next(lessons);
  //         });
  //     });
  //   });
  // }

  getDayLessonsTimetable(idPerson: number, year: number, month: number, day: number): Observable<Lesson[]> {
    return new Observable<Lesson[]>(subscriber => {
      this.getMonthLessonsTimetable(idPerson, year, month).pipe(map(lessons => {
        const res = [];
        for (const lesson of lessons) {
          if (lesson.timeBegin.day === day) {
            res.push(lesson);
          }
        }
        return res;
      })).subscribe(resultedLessons => {
        subscriber.next(resultedLessons);
      });
    });
  }

  getMonthLessonsAttend(idPerson: number, year: number, month: number): Observable<Lesson[]> {
    return new Observable<Lesson[]>(subscriber => {
      this.getRoleId(idPerson, this.d.userRoles.student).subscribe(idStudent => {
        this.http.get<any>(this.d.URL.server + this.d.URL.visit.url +
          this.d.URL.visit.id + idStudent +
          this.d.URL.visit.from + this.calendar.setDateInMillsLeft(year, month, 1) +
          this.d.URL.visit.to + this.calendar.setDateInMillsRight(year, month, this.calendar.getCountOfDaysInMonth(year, month)))
          .subscribe(visits => {
            const lessons = [];
            for (let i = 0; i < visits.length; ++i) {
              lessons.push(new Lesson(
                this.getByPath(visits[i], this.d.visitResponse.presence),
                this.getByPath(visits[i], this.d.visitResponse.pay),
                this.getByPath(visits[i], this.d.visitResponse.begin),
                this.getByPath(visits[i], this.d.visitResponse.end),
                this.getByPath(visits[i], this.d.visitResponse.place),
                this.getByPath(visits[i], this.d.visitResponse.title),
                idStudent
              ));
            }
            subscriber.next(lessons);
          });
      });
    });

  }

  getMonthLessonsTimetable(idPerson: number, year: number, month: number): Observable<Lesson[]> {
    return new Observable<Lesson[]>(subscriber => {
      this.getRoleId(idPerson, this.d.userRoles.student).subscribe(idStudent => {
        this.getGroupsId(idStudent).subscribe(groupsId => {
          let result: Lesson[] = [];
          const stream$ = range(0, groupsId.length).subscribe(groupId => {
            this.http.get<any>(this.d.URL.server + this.d.URL.lesson.url +
              this.d.URL.lesson.id + groupsId[groupId] +
              this.d.URL.lesson.year + year +
              this.d.URL.lesson.month + month, {observe: 'body'}).pipe(map(lessons => {
              const res = [];
              for (const lesson of lessons) {
                res.push(new Lesson(
                  true,
                  true,
                  this.getByPath(lesson, this.d.lessonResponse.begin),
                  this.getByPath(lesson, this.d.lessonResponse.end),
                  this.getByPath(lesson, this.d.lessonResponse.place),
                  this.getByPath(lesson, this.d.lessonResponse.title),
                  idStudent));
              }
              return res;
            })).subscribe(resultedLessons => {
              result = result.concat(resultedLessons);
              subscriber.next(result);
            });
          });
        });
      });
    });
  }

  getRoleId(idPerson: number, role: string): Observable<number> {
    return this.http.get<any>(this.d.URL.server + this.d.URL.person.url + idPerson + this.d.URL.person.role, {observe: 'body'}).pipe(
      map(roles => roles[`${role}`])
    );
  }

  getChildsId(idPerson: number): Observable<number[]> {
    return new Observable<number[]>(subscriber => {
      this.getRoleId(idPerson, this.d.userRoles.parent).subscribe(idParent => {
        this.http.get<any>(this.d.URL.server + this.d.URL.parent.urlFirst + idParent + this.d.URL.parent.urlSecond).subscribe(massive => {
          const childs = [];
          for (let i = 0; i < massive.length; ++i) {
            childs.push(this.getByPath(massive[i], this.d.parentResponse.childId));
          }
          subscriber.next(childs);
        });
      });
    });
  }

  getFullName(idPerson: number): Observable<string> {
    return this.http.get<any>(this.d.URL.server + this.d.URL.person.url + idPerson).pipe(
      map(person => `${person[`${this.d.personResponse.name}`]} ${person[`${this.d.personResponse.surname}`]}`)
    );
  }

  getFullNames(idsPerson: number[]): Observable<string[]> {
    return new Observable<string[]>(subscriber => {
      let result: string[] = [];
      const stream$ = range(0, idsPerson.length).subscribe(id => {
        this.getFullName(idsPerson[id]).subscribe(fullName => {
          result = result.concat(fullName);
          subscriber.next(result);
        });
      });
    });
  }

}
