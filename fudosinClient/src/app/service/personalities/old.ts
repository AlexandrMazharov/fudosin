import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Lesson} from '../../models/lesson.model';

const URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class StudentParentServiceOLD {

  private lesson = 'lesson/';
  private student = 'student/';
  private person = 'person/';
  private parent = 'parent/';

  constructor(private http: HttpClient) {
  }

  private getIdOfRole(idPerson: number, role: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.http.get<any>(URL + this.person + idPerson + '/roles', {observe: 'body'}).subscribe(data => {
        if (data[`${role}`] !== null) {
          resolve(data[`${role}`]);
        } else {
          reject(-1);
        }
      }, () => {
        reject(-1);
      });
    });
  }

  // STUDENT

  // Impossible now
  // getLessonsDay(idPerson: number, year: number, month: number, day: number): Promise<Lesson[]> {
  //   return new Promise<Lesson[]>((resolve, reject) => {
  //     this.getIdOfRole(idPerson, 'student').then(idStudent => {
  //
  //     })
  //   });
  // }

  private queryForStudent(massive: any[], num: number, url: string, year: number, month: number, id: number, result: any[]): Promise<any> {
    return new Promise<any>(resolve => {
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

  getLessonsMonth(idPerson: number, year: number, month: number): Promise<Lesson[]> {
    return new Promise<Lesson[]>((resolve, reject) => {
      this.getIdOfRole(idPerson, 'student').then(studentId => {
        this.getGroupsId(studentId).then(
          res => {
            let result: Lesson[] = [];
            this.queryForStudent(res, 0, URL, year, month, studentId, result).then(d => {
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

  getChildsId(idPerson: number): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      this.getIdOfRole(idPerson, 'parent').then(idParent => {
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
    });
  }

  getNameSurname(idPerson: number): Promise<string[]> {
    return new Promise<string[]>((resolve) => {
      this.http.get<any>(URL + this.person + idPerson, {observe: 'body'}).subscribe(data => {
        let result = [];
        if (data.firstName !== null) {
          result.push(data.firstName);
        } else {
          result.push('ИМЯ');
        }
        if (data.lastName !== null) {
          result.push(data.lastName);
        } else {
          result.push('ФАМИЛИЯ');
        }
        resolve(result);
      }, () => {
        resolve(['ИМЯ', 'ФАМИЛИЯ']);
      });
    });
  }

  getFullNames(ides: number[], num: number, result: string[]): Promise<string[]> {
    return new Promise<string[]>(resolve => {
      if (num >= ides.length) {
        resolve(result);
      } else {
        this.getNameSurname(ides[num]).then(res => {
          result = result.concat(`${res[0]} ${res[1]}`);
          resolve(this.getFullNames(ides, ++num, result));
        });
      }
    });
  }

}
