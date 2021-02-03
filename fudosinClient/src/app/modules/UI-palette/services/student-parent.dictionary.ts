export class StudentParentDictionary {

  readonly userRoles = {
    student: 'student',
    parent: 'parent'
  };

  readonly calendarTypeWork = {
    attend: 'attend',
    timetable: 'timetable'
  };

  readonly URLmarks = {
    ifAsParent: '/s/',
    ifAsAttend: '/attend/',
    ifAsTimetable: '/timetable/',
  };

  readonly URLparams = {
    year: 'year_id',
    month: 'month_id',
    day: 'day_id',
    student: 'stud_id',
  };

  readonly ERoles = {
    student: 'ROLE_STUDENT',
    parent: 'ROLE_PARENT',
    instructor: 'ROLE_INSTRUCTOR',
    admin: 'ROLE_ADMIN'
  };

  readonly schools = {
    aikido: 'айкидо',
    kobudo: 'кобудо',
    jiu_jitsu: 'джиу-джитсу',
  };

  readonly CSSnamespace = {
    present: {
      yes: 'present',
      no: 'non-present'
    },
    school: {
      aikido: 'aikido',
      kobudo: 'kobudo',
      jiu_jitsu: 'jiu-jitsu',
    },
    paid: {
      yes: 'money',
      no: 'no-money'
    }
  };

}
