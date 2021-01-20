import {Injectable} from '@angular/core';
import {Role} from 'src/app/models/role.model';

@Injectable()
export class NavService {

  private static ERole: string[] = [
    'STUDENT',
    'PARENT',
    'INSTRUCTOR',
    'ADMIN'
  ];

  private static links: string[] = [
    'main',
    'timetable',
    'attend',
    'documents',
    'bills',
    'user-reg',
    'groups',
    'exit'
  ];

  private static items: string[] = [
    'ГЛАВНАЯ',
    'РАСПИСАНИЕ',
    'ПОСЕЩАЕМОСТЬ',
    'ДОГОВОРЫ',
    'ОПЛАТА ОБУЧЕНИЯ',
    'СОЗДАНИЕ УЧЁТНОЙ ЗАПИСИ',
    'УЧЕБНЫЕ ГРУППЫ',
    'ВЫХОД'
  ];

  private static roleKeys = {
    student: [0, 1, 2, NavService.items.length - 1],
    parent: [0, 1, 2, 3, NavService.items.length - 1],
    trainer: [0, 1, 2, 4, 7, NavService.items.length - 1],
    admin: [0, 1, 2, 3, 4, 5, 6, NavService.items.length - 1]
  };

  private static sumBoth(mas1: number[], mas2: number[]): number[] {
    for (let i = 0; i < mas1.length; ++i) {
      if (this.checkNumber(mas2, mas1[i])) {
        const idNew = this.getPlace(mas2, i);
        const left = mas2.slice(0, idNew);
        const right = mas2.slice(idNew);
        mas2 = left.concat(mas1[i], right);
      }
    }
    return mas2;
  }

  private static checkNumber(mas: number[], num: number): boolean {
    let b = true;
    for (let j = 0; j < mas.length; ++j) {
      if (num === mas[j]) {
        b = false;
        break;
      }
    }
    return b;
  }

  private static getPlace(mas: number[], adding: number): number {
    for (let i = 0; i < mas.length; ++i) {
      if (adding < mas[i]) {
        return i;
      }
    }
    return -1;
  }

  static getItems(roles: Role[] | string[] | undefined): string[] {
    let keys: number[];
    if (roles === undefined) {
      keys = this.getKeys(undefined);
    } else {
      keys = this.getKeys(roles[0]);
      for (let i = 1; i < roles.length; ++i) {
        keys = this.sumBoth(keys, this.getKeys(roles[i]));
      }
    }

    const result: string[] = [];
    for (let i = 0; i < keys.length; ++i) {
      result.push(this.items[keys[i]]);
    }
    return result;
  }

  static getLinks(roles: Role[] | string[] | undefined): string[] {
    let keys: number[];
    if (roles === undefined) {
      keys = this.getKeys(undefined);
    } else {
      keys = this.getKeys(roles[0]);
      for (let i = 1; i < roles.length; ++i) {
        keys = this.sumBoth(keys, this.getKeys(roles[i]));
      }
    }

    const result: string[] = [];
    for (let i = 0; i < keys.length; ++i) {
      result.push(this.links[keys[i]]);
    }
    return result;
  }

  private static getKeys(role: Role | string | undefined): number[] {
    if (typeof role !== 'string') {
      if (role === undefined || role.name === 'ROLE_STUDENT') {
        return NavService.roleKeys.student;
      }
      if (role.name === 'ROLE_PARENT') {
        return NavService.roleKeys.parent;
      }
      if (role.name === 'ROLE_INSTRUCTOR') {
        return NavService.roleKeys.trainer;
      }
      if (role.name === 'ROLE_ADMIN') {
        return NavService.roleKeys.admin;
      } else {
        return [];
      }
    } else {
      if (role === undefined || role === 'ROLE_STUDENT') {
        return NavService.roleKeys.student;
      }
      if (role === 'ROLE_PARENT') {
        return NavService.roleKeys.parent;
      }
      if (role === 'ROLE_INSTRUCTOR') {
        return NavService.roleKeys.trainer;
      }
      if (role === 'ROLE_ADMIN') {
        return NavService.roleKeys.admin;
      } else {
        return [];
      }
    }
  }

}
