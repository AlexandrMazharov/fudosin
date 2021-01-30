import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Lesson} from '../../models/lesson.model';

const URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class StudentParentService {

  private lesson = 'lesson/';
  private student = 'student/';
  private person = 'person/';
  private parent = 'parent/';

  constructor(private http: HttpClient) {
  }

  // STUDENT

  // getLessonsDayStudent(idStudent: number, year: number, month: number, day: number): Promise<Lesson[]> {
  //
  // }

  private queryForStudent(massive: any[], num: number, url: string, year: number, month: number, id: number, result: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (num >= massive.length) {
        resolve(result);
      } else {
        this.getLessonsOfGroup(id, massive[num], year, month).then(data => {
          result = result.concat(data);
          resolve(this.queryForStudent(massive, ++num, url, year, month, id, result));
        });
      }
    });
  }

  getLessonsMonthStudent(idPerson: number, year: number, month: number): Promise<Lesson[]> {
    return new Promise<Lesson[]>((resolve, reject) => {
      this.http.get<any>(URL + this.person + idPerson + '/roles', {observe: 'body'}).subscribe(roles => {
        this.getGroupsId(roles.student).then(
          res => {
            let result: Lesson[] = [];
            this.queryForStudent(res, 0, URL, year, month, roles.student, result).then(d => {
              resolve(d);
            }, () => {
              reject([]);
            });
          },
          () => {
            reject([]);
          });
      });
    });
  }

  private getGroupsId(idStudent: number): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      this.http.get<any>(URL + this.student + `${idStudent}/group`, {observe: 'body'}).subscribe(data => {
        resolve(data);
      }, () => {
        reject([]);
      });
    });
  }

  private getLessonsOfGroup(idStudent: number, idGroup: number, year: number, month: number): Promise<Lesson[]> {
    return new Promise<Lesson[]>((resolve, reject) => {
      this.http.get<any>(URL + this.lesson + `group/${idGroup}/${year}/${month}`, {observe: 'body'}).subscribe(lessons => {
        let result = [];
        for (let i = 0; i < lessons.length; ++i) {
          result.push(new Lesson(
            true,  // fix it!!!
            true,  // fix it!!!
            lessons[i].timeStart,
            lessons[i].timeFinish,
            lessons[i].place,
            lessons[i].trainingGroup.domain.name,
            idStudent));
        }
        resolve(result);
      }, error => {
        reject([]);
      });
    });
  }

  // PARENT

  getChildsId(idParent: number): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      this.http.get<any>(URL + this.parent + `${idParent}/students`, {observe: 'body'}).subscribe(data => {
        let result = [];
        for (let i = 0; i < data.length; ++i) {
          result.push(+data[i].person.id); // also persons id-s
        }
        resolve(result);
      }, () => {
        reject([]);
      });
    });
  }

  getLessonsMonthParent(idPerson: number, year: number, month: number): Promise<Lesson[]> {
    return new Promise<any[]>((resolve, reject) => {
      this.http.get<any>(URL + this.person + idPerson + '/roles', {observe: 'body'}).subscribe(roles => {
        this.getChildsId(+roles.parent).then(
          res => {
            let result: Lesson[] = [];
            this.queryForParent(res, 0, 2021, 1, result).then(d => {
              resolve(d);
            });
          },
          () => {
            reject([]);
          });
      }, error => {
        reject([]);
      });
    });
  }

  private queryForParent(massive: any[], num: number, year: number, month: number, result: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (num >= massive.length) {
        resolve(result);
      } else {
        this.getLessonsMonthStudent(massive[num], year, month).then(d => {
          result = result.concat(d);
          resolve(this.queryForParent(massive, ++num, year, month, result));
        }, () => {
          reject([]);
        });
      }
    });
  }

  // getLessonsDayParent(idParent: number, year: number, month: number, day: number): Promise<Lesson[]> {
  //
  // }

}
