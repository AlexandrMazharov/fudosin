// @ts-ignore
import * as pdfMake from 'pdfmake/build/pdfmake.js';
// @ts-ignore
import * as pdfFonts from './assets/fonts/vfs_fonts.js';
import {header} from './assets/inner-header';
import {footer} from './assets/inner-footer';
import {img} from './assets/img';
import {TimetableCreatorService} from './assets/timetable-creator.service';
import {CalendarService} from '../../modules/UI-palette/services/calendar.service';
import {MonthLesson} from '../../models/month-lessons.model';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  Times: {
    normal: 'times.ttf',
    bold: 'timesbd.ttf',
    italics: 'timesi.ttf',
    bolditalics: 'timesbi.ttf'
  }
};


export class PdfCreateService {

  private fullName;
  private timetable;
  private error = 'ОШИБКА В ПОЛУЧЕНИИ ДАННЫХ';

  private doc = {

    info: {
      title: 'Справка о посещении учеником занятий в клубе боевых искусств Фудосин',
      author: 'https://vk.com/fudoshin',
      subject: 'Справка',
      keywords: 'Справка, fudoshin, Фудосин, Джиу-Джитсу, Айкидо, Кобудо, Самара',
    },

    pageSize: 'A4',
    pageOrientation: 'portrait',
    pageMargins: [
      this.mmToPx(30), // left
      this.mmToPx(20), // top
      this.mmToPx(15), // right
      this.mmToPx(20)], // bottom

    styles: {
      header: {
        fontSize: 16,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, this.pointsToPx(6)]
      },
      content: {
        fontSize: 14,
        alignment: 'left',
        margin: [0, 0, 0, this.pointsToPx(6)]
      },
      footer: {
        fontSize: 14,
        alignment: 'left'
      },
      date: {
        fontSize: 12,
        alignment: 'right',
        margin: [0, this.pointsToPx(6), 0, 0]
      }
    },

    defaultStyle: {
      font: 'Times'
    },

    content: [
      {
        image: img,
        width: 64
      },
      {
        text: header,
        style: 'header'
      },
      {
        text: '',
        style: 'content'
      },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [110, 110, '*'],

          body: [
            ['Направление', 'День недели', 'Время'],
          ]
        },
        style: 'content'
      },
      {
        text: footer,
        style: 'footer'
      },
      {
        text: `Справка сформирована ${new CalendarService().getFullDate()}`,
        style: 'date'
      }
    ]
  };

  constructor(fullname: string, timetable: MonthLesson, year: number, month: number) {
    if (fullname === undefined || fullname === null) {
      this.fullName = this.error;
    } else {
      this.fullName = fullname;
    }
    if (timetable === undefined || timetable === null) {
      this.timetable = this.error;
    } else {
      this.timetable = TimetableCreatorService.create(timetable, year, month);
      ;
    }
    this.doc.content[2] =
      {
        text: `${this.fullName} действительно посещает занятия по следующему расписанию:`,
        style: 'content'
      };
    if (typeof this.timetable !== 'string') {
      for (const school of this.timetable) {
        const first = `${school.name}`;
        let second = ``;
        let third = ``;
        for (const day of school.week) {
          if (day !== undefined) {
            second += `${day.day}\n`;
            for (const time of day.time) {
              second += `\n`;
              third += `${time}\n`;
            }
            third += '\n';
          }
        }
        // @ts-ignore
        this.doc.content[3].table.body.push([{text: first, bold: true}, second, third]);
      }
    }
  }

  create(): void {
    pdfMake.createPdf(this.doc).download(`Справка о посещении занятий_${this.fullName}.pdf`);
  }

  private mmToPx(mm: number): number {
    return (mm * 3.7938105);
  }

  private pointsToPx(points: number): number {
    return (points * 1.666);
  }

}
