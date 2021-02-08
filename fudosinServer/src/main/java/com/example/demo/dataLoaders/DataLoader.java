package com.example.demo.dataLoaders;

import com.example.demo.models.*;
import com.example.demo.repos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.*;

@Component
public class DataLoader implements ApplicationRunner {

    private RoleRepository roleRepository;
    private PersonRepository userRepository;
    private PasswordEncoder encoder;
    private StudentRepository studentRepository;
    private ParentRepository parentRepository;
    private InstructorRepository instructorRepository;
    private AdministratorRepository administratorRepository;
    private TrainingGroupRepository trainingGroupRepository;
    private LessonRepository lessonRepository;
    private VisitRepository visitRepository;
    private DomainRepository domainRepository;

    @Autowired
    public DataLoader(PersonRepository personRepository,
                      RoleRepository roleRepository,
                      PasswordEncoder encoder,
                      StudentRepository studentRepository,
                      ParentRepository parentRepository,
                      InstructorRepository instructorRepository,
                      AdministratorRepository administratorRepository,
                      TrainingGroupRepository trainingGroupRepository,
                      LessonRepository lessonRepository,
                      VisitRepository visitRepository,
                      DomainRepository domainRepository

    ) {
        this.encoder = encoder;
        this.roleRepository = roleRepository;
        this.userRepository = personRepository;
        this.studentRepository = studentRepository;
        this.parentRepository = parentRepository;
        this.instructorRepository = instructorRepository;
        this.administratorRepository = administratorRepository;
        this.trainingGroupRepository = trainingGroupRepository;
        this.lessonRepository = lessonRepository;
        this.visitRepository = visitRepository;
        this.domainRepository = domainRepository;
    }

    @Override
    public void run(ApplicationArguments args) {


        insertDomain();
        insertRealGroupAndLesson();

        insertRoles();
        insertUserStudentParent();
        insertUserInstructor();
        insertUserAdmin();
        insertStudentsParents();
        insertVisits();
        insertInstructorGroup();


    }

    private void insertRealGroupAndLesson() {
        Domain domainJJ = domainRepository.findById(Long.valueOf(1)).get();
        Domain domainAikido = domainRepository.findById(Long.valueOf(2)).get();
        Domain domainKobudo = domainRepository.findById(Long.valueOf(3)).get();

// add groups
        TrainingGroup groupJJ1 = new TrainingGroup(domainJJ, "Группа 1");
        TrainingGroup groupJJ2 = new TrainingGroup(domainJJ, "Группа 2");
        TrainingGroup groupJJ3 = new TrainingGroup(domainJJ, "Группа 3");
        trainingGroupRepository.save(groupJJ1);
        trainingGroupRepository.save(groupJJ2);
        trainingGroupRepository.save(groupJJ3);

        TrainingGroup groupAkido1 = new TrainingGroup(domainAikido, "Группа 1");
        TrainingGroup groupAkido2 = new TrainingGroup(domainAikido, "Группа 2");
        trainingGroupRepository.save(groupAkido1);
        trainingGroupRepository.save(groupAkido2);

        TrainingGroup groupKobudo1 = new TrainingGroup(domainKobudo, "Группа 1");
        trainingGroupRepository.save(groupKobudo1);

        Calendar start = new GregorianCalendar();
        Calendar end = new GregorianCalendar();
        end.add(Calendar.MONTH, 6);
        while (start.before(end)) {

            String place = "Орбита";
            if (start.get(Calendar.DAY_OF_WEEK) == 2 || start.get(Calendar.DAY_OF_WEEK) == 4 || start.get(Calendar.DAY_OF_WEEK) == 6  ) {
                // Monday and Wednesday and Friday
                start.set(Calendar.HOUR_OF_DAY, 18);
                start.set(Calendar.MINUTE, 30);
                lessonRepository.save(createLesson(start, 60, groupJJ1, place));

                start.set(Calendar.HOUR_OF_DAY, 19);
                start.set(Calendar.MINUTE, 30);
                lessonRepository.save(createLesson(start, 90, groupJJ2, place));
            }
            if (start.get(Calendar.DAY_OF_WEEK) == 3 || start.get(Calendar.DAY_OF_WEEK) == 5) {
                // Tuesday and Thursday
                start.set(Calendar.HOUR_OF_DAY, 19);
                start.set(Calendar.MINUTE, 30);
                lessonRepository.save(createLesson(start, 90, groupAkido1, place));
            }
            if (start.get(Calendar.DAY_OF_WEEK) == 7) {
                // Saturday
                start.set(Calendar.HOUR_OF_DAY, 17);
                start.set(Calendar.MINUTE, 0);
                lessonRepository.save(createLesson(start, 60, groupKobudo1, place));
            }
            place = "Молодежный";
            if (start.get(Calendar.DAY_OF_WEEK) == 3 || start.get(Calendar.DAY_OF_WEEK) == 5) {
                start.set(Calendar.HOUR_OF_DAY, 20);
                start.set(Calendar.MINUTE, 0);
                lessonRepository.save(createLesson(start, 60, groupAkido2, place));
            }
            if (start.get(Calendar.DAY_OF_WEEK) == 6) {
                start.set(Calendar.HOUR_OF_DAY, 10);
                start.set(Calendar.MINUTE, 0);
                lessonRepository.save(createLesson(start, 60, groupAkido2, place));
            }

            if (start.get(Calendar.DAY_OF_WEEK) == 2
                    || start.get(Calendar.DAY_OF_WEEK) == 4
                    || start.get(Calendar.DAY_OF_WEEK) == 6
            ) {
                start.set(Calendar.HOUR_OF_DAY, 19);
                start.set(Calendar.MINUTE, 15);
                lessonRepository.save(createLesson(start, 90, groupJJ3, place));
            }

            start.add(Calendar.DAY_OF_MONTH, 1);
        }


    }

    private Lesson createLesson(Calendar start, int duration, TrainingGroup group, String place) {
        Calendar finish = (Calendar) start.clone();
        finish.add(Calendar.MINUTE, duration);
        return new Lesson(start.getTime(), finish.getTime(), place, group);
    }

    private void insertLessons() {

        for (TrainingGroup group : trainingGroupRepository.findAll()) {

            Calendar date1 = new GregorianCalendar();
            date1.set(Calendar.YEAR, 2020);
            date1.set(Calendar.MONTH, 2);
            date1.set(Calendar.DAY_OF_MONTH, 1);
            date1.set(Calendar.HOUR_OF_DAY, 19);
            date1.set(Calendar.MINUTE, 0);
            date1.set(Calendar.SECOND, 0);
            date1.set(Calendar.MILLISECOND, 0);

            Calendar date2 = new GregorianCalendar();
            date2.set(Calendar.YEAR, 2020);
            date2.set(Calendar.MONTH, 2);
            date2.set(Calendar.DAY_OF_MONTH, 1);
            date2.set(Calendar.HOUR_OF_DAY, 21);
            date2.set(Calendar.MINUTE, 0);
            date2.set(Calendar.SECOND, 0);
            date2.set(Calendar.MILLISECOND, 0);

            String place = "Орбита";
            if (!lessonRepository.existsLessonByTrainingGroup(group)) {
                for (int i = 0; i < 10; i++) {
                    date1.set(Calendar.DAY_OF_MONTH, date1.get(Calendar.DAY_OF_MONTH) + 2);
                    date2.set(Calendar.DAY_OF_MONTH, date2.get(Calendar.DAY_OF_MONTH) + 2);
                    Lesson lesson = new Lesson(date1.getTime(), date2.getTime(), place, group);
                    lessonRepository.save(lesson);
                }
            }
        }

    }

    private void addStudentRole(Set<Role> roles) {
        Role roleStudent = roleRepository.findByName(ERole.ROLE_STUDENT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(roleStudent);
    }

    private void addParentRole(Set<Role> roles) {
        Role roleStudent = roleRepository.findByName(ERole.ROLE_PARENT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(roleStudent);
    }

    private void addInstructorRole(Set<Role> roles) {
        Role instrRole = roleRepository.findByName(ERole.ROLE_INSTRUCTOR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(instrRole);
    }

    private void addAdminRole(Set<Role> roles) {
        Role instrRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(instrRole);
    }

    private void insertRoles() {
        if (roleRepository.count() != ERole.values().length) {
            for (ERole role : ERole.values()) {
                roleRepository.save(new Role(role));
            }
        }
    }

    private void insertUserStudentParent() {
        String username = "studentParent@email.ru";
        String email = "studentParent@email.ru";
        String password = "studentParent@email.ru";
        System.out.println("STUDENT,PARENT: username: " + username + " email: " + email + " password: " + password);
        if (!userRepository.existsByUsername(username) & (!userRepository.existsByEmail(email))) {
            Person user = new Person(username, email, encoder.encode(password));
            Set<Role> roles = new HashSet<>();
            addStudentRole(roles);
            addParentRole(roles);
            user.setUserRoles(roles);

            Student student = new Student();
            student.setPerson(user);
            user.setStudent(student);
            userRepository.save(user);

        }
    }

    private void insertUserInstructor() {
        String username = "instructor@email.ru";
        String email = "instructor@email.ru";
        String password = "instructor@email.ru";

        System.out.println("INSTRUCTOR: username: " + username + " email: " + email + " password: " + password);
        if (!userRepository.existsByUsername(username) & (!userRepository.existsByEmail(email))) {
            Person user = new Person(username, email, encoder.encode(password));
            Set<Role> roles = new HashSet<>();
            addStudentRole(roles);
            addParentRole(roles);
            addInstructorRole(roles);
            user.setUserRoles(roles);

            Student student = new Student();
            student.setPerson(user);

            Instructor instructor = new Instructor();
            instructor.setPerson(user);

            user.setStudent(student);

            user.setInstructor(instructor);
            userRepository.save(user);
        }
    }

    private void insertUserAdmin() {
        String username = "admin@email.ru";
        String email = "admin@email.ru";
        String password = "admin@email.ru";
        System.out.println("ADMIN: username: " + username + " email: " + email + " password: " + password);
        if (!userRepository.existsByUsername(username) & (!userRepository.existsByEmail(email))) {
            Person user = new Person(username, email, encoder.encode("admin@email.ru"));
            Set<Role> roles = new HashSet<>();
            addStudentRole(roles);
            addParentRole(roles);
            addInstructorRole(roles);
            addAdminRole(roles);
            user.setUserRoles(roles);

            Student student = new Student();
            student.setPerson(user);

            Instructor instructor = new Instructor();
            instructor.setPerson(user);

            Administrator administrator = new Administrator();
            administrator.setPerson(user);

            user.setStudent(student);

            user.setInstructor(instructor);
            user.setAdministrator(administrator);

            userRepository.save(user);

        }
    }

    private void insertStudentsParents() {
        String studentUsername, studentEmail, studentPassword;
        String parentUsername, parentEmail, parentPassword;
        String[] stud = {"student1@email.ru", "student2@email.ru", "student3@email.ru", "student4@email.ru"};
        String[] par = {
                "parentOfStudent1@email.ru", "parentOfStudent2@email.ru", "parentOfStudent3@email.ru", "parentOfStudent4@email.ru"};
        for (int i = 0; i < stud.length; i++) {

            parentUsername = parentEmail = parentPassword = par[i];
            studentUsername = studentEmail = studentPassword = stud[i];
            if (i == 0) {
                System.out.println("STUDENT: username: " + studentUsername + " email: " + studentEmail + " password: " + parentPassword);
                System.out.println("ITS PARENT: username: " + parentUsername + " email: " + parentEmail + " password: " + parentPassword);
            }
            if (!userRepository.existsByUsername(studentUsername) & (!userRepository.existsByEmail(studentEmail))) {
                Person newStudent = new Person(studentUsername, studentEmail, encoder.encode(studentPassword));
                Person newParent = new Person(parentUsername, parentEmail, encoder.encode(parentPassword));

                // устанавливаем роли новому стеденту
                Set<Role> rolesStudent = new HashSet<>();
                addStudentRole(rolesStudent);
                newStudent.setUserRoles(rolesStudent);

                // устанавливаем роли новому родителю
                Set<Role> rolesParent = new HashSet<>();
                addParentRole(rolesParent);
                newParent.setUserRoles(rolesParent);

                // заводим новое после в таблице student и связываем с Person
                Parent parent = new Parent();
                Student student = new Student();

                student.setParent(parent);
                student.setPerson(newStudent);

                // заводим новое после в таблице parent и связываем с student

                parent.setPerson(newParent);
                parent.addStudent(student);

                newStudent.setStudent(student);
                newParent.setParent(parent);

                // сохраняем всех
                userRepository.save(newStudent);
                userRepository.save(newParent);

                // добавляем нового студента во все группы
                List<TrainingGroup> trainingGroups = trainingGroupRepository.findAll();
                for (TrainingGroup trainingGroup : trainingGroups) {
                    trainingGroup.addStudent(newStudent.getStudent());
                    trainingGroupRepository.save(trainingGroup);
                }
            }
        }
    }

    private void insertVisits() {
//        всем студетам первой группы создать посещение первого занятия
        TrainingGroup trainingGroup = trainingGroupRepository.findById(Long.valueOf(1)).orElseThrow();
        Set<Student> students = studentRepository.findAllByGroups(trainingGroup);
        Lesson lesson = lessonRepository.findById(Long.valueOf(1)).get();
        int i = 0;
        for (Student student : students) {
            Visit visit = new Visit();
            visit.setLesson(lesson);
            visit.setStudent(student);
            if (i % 2 == 0) visit.setIsPresent("Был");
            else visit.setIsPresent("Опаздал");

            if (i % 3 == 0) visit.setPaymentStatus("Оплачено");
            else visit.setPaymentStatus("Деньги у Николая");
            visitRepository.save(visit);
            i++;


        }
    }

    private void insertInstructorGroup() {
        List<Instructor> instructors = instructorRepository.findAll();
        List<TrainingGroup> trainingGroups = trainingGroupRepository.findAll();

        for (TrainingGroup trGroup : trainingGroups) {
            trGroup.setInstructors(new HashSet<>());
            trainingGroupRepository.save(trGroup);

            for (Instructor instructor : instructors) {
                trGroup.addInstructor(instructor);
            }
            trainingGroupRepository.save(trGroup);
        }
    }


//    private void insertTrainingGroup() {
//        for (Domain domain : domainRepository.findAll()) {
//            if (!trainingGroupRepository.existsTrainingGroupByDomain(domain)) {
//                TrainingGroup trainingGroup1 = new TrainingGroup(domain, "Дети");
//                TrainingGroup trainingGroup2 = new TrainingGroup(domain, "Взрослые");
//                trainingGroupRepository.save(trainingGroup1);
//                trainingGroupRepository.save(trainingGroup2);
//            }
//        }
//    }

    private void insertDomain() {
        String[] domains = {"Джиу-джитсу", "Айкидо", "Кобудо"};

        for (String domain : domains) {
            if (!domainRepository.existsDomainByName(domain)) {
                domainRepository.save(new Domain(domain));
            }
        }
    }
}


