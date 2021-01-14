import { Injectable } from "@angular/core";
import { Person } from "src/app/models/person.model";
import { Role } from "src/app/models/role.model";

@Injectable()
export class NavService {

    private static ERole: string[] = [
        'STUDENT',
        'PARENT',
        'INSTRUCTOR',
        'ADMIN'
    ]

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
    }

    private static sumBoth(mas_1: number[], mas_2: number[]): number[] {
        for (let i = 0; i < mas_1.length; ++i) {
            if (this.checkNumber(mas_2, mas_1[i])) {
                let id_new = this.getPlace(mas_2, i);
                let left = mas_2.slice(0, id_new);
                let right = mas_2.slice(id_new);
                mas_2 = left.concat(mas_1[i], right);
            }
        }
        return mas_2;
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

    private static getPlace(mas: number[], adding: number) {
        for (let i = 0; i < mas.length; ++i) {
            if (adding < mas[i]) return i;
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

        let result: string[] = [];
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

        let result: string[] = [];
        for (let i = 0; i < keys.length; ++i) {
            result.push(this.links[keys[i]]);
        }
        return result;
    }

    private static getKeys(role: Role | string | undefined): number[] {
        if (typeof role !== 'string') {
            if (role === undefined || role.name === 'STUDENT') return NavService.roleKeys.student;
            if (role.name === 'PARENT') return NavService.roleKeys.parent;
            if (role.name === 'INSTRUCTOR') return NavService.roleKeys.trainer;
            if (role.name === 'ADMIN') return NavService.roleKeys.admin;
            else return [];
        } else {
            if (role === undefined || role === 'STUDENT') return NavService.roleKeys.student;
            if (role === 'PARENT') return NavService.roleKeys.parent;
            if (role === 'INSTRUCTOR') return NavService.roleKeys.trainer;
            if (role === 'ADMIN') return NavService.roleKeys.admin;
            else return [];
        }
    }

}