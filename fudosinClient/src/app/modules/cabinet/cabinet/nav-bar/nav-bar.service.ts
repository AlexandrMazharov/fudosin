import {Injectable} from '@angular/core';

@Injectable()
export class NavService {

  private static ERole: string[] = [
    'ROLE_STUDENT',
    'ROLE_PARENT',
    'ROLE_INSTRUCTOR',
    'ROLE_ADMIN'
  ];

  private static links: string[] = [
    'main',
    'timetable',
    'attend',
    'documents',
    'bills',
    'reg',
    'groups',
  ];

  private static items: string[] = [
    'ГЛАВНАЯ',
    'РАСПИСАНИЕ',
    'ПОСЕЩАЕМОСТЬ',
    'ДОГОВОРЫ',
    'ОПЛАТА ОБУЧЕНИЯ',
    'СОЗДАНИЕ УЧЁТНОЙ ЗАПИСИ',
    'УЧЕБНЫЕ ГРУППЫ',
  ];

  private static roleKeys = {
    // student: [0, 1, 2, NavService.items.length - 1],
    // parent: [0, 1, 2, 3, NavService.items.length - 1],
    // trainer: [0, 1, 2, 4, 7, NavService.items.length - 1],
    // admin: [0, 1, 2, 3, 4, 5, 6, NavService.items.length - 1]

    student: [],
    parent: [],
    trainer: [],
    admin: [0, 5]
  };

  private static sumBoth(mas1: number[], mas2: number[]): number[] {
    for (let i = 0; i < mas1.length; ++i) {
      if (this.checkNumber(mas2, mas1[i])) {
        const newOne = this.getPlace(mas2, i);
        const left = mas2.slice(0, newOne);
        const right = mas2.slice(newOne);
        mas2 = left.concat(mas1[i], right);
      }
    }
    return mas2;
  }

  private static checkNumber(mas: number[], num: number): boolean {
    let b = true;
    for (const item of mas) {
      if (num === item) {
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

  static getItems(roles: string[] | undefined): string[] {
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
    keys.forEach(i => {
      result.push(this.items[i]);
    });
    return result;
  }

  static getLinks(roles: string[] | undefined): string[] {
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
    keys.forEach(i => {
      result.push(this.links[i]);
    });
    return result;
  }

  private static getKeys(role: string | undefined): number[] {
    if (role === undefined || role === this.ERole[0]) {
      return NavService.roleKeys.student;
    }
    if (role === this.ERole[1]) {
      return NavService.roleKeys.parent;
    }
    if (role === this.ERole[2]) {
      return NavService.roleKeys.trainer;
    }
    if (role === this.ERole[3]) {
      return NavService.roleKeys.admin;
    } else {
      return [];
    }
  }

  // static getTitle(link: string): string {
  //   for (let i = 0; i < NavService.links.length; ++i) {
  //     if (link === NavService.links[i]) {
  //       return NavService.items[i];
  //     }
  //   }
  //   return 'Извините, страница не найдена...';
  // }

  static getTitle(link: string): string {
    const l = link.split('/');
    for (let i = 0; l.length; ++i) {
      for (let j = 0; j < NavService.links.length; ++j) {
        if (l[i] === NavService.links[j]) {
          return NavService.items[j];
        }
      }
    }
    return 'Извините, страница не найдена...';
  }

}
