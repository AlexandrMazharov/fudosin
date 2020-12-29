package com.example.demo.entity;

import javax.persistence.*;
import java.util.Set;

@Table
@Entity
public class TrainingGroup {
    // учебная группа состоит из списка учеников и инструктора
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // домен. группа имеет домен
    @ManyToOne
    @JoinColumn(name = "domen")
    private DomenDictionary domen;

    // создаем таблицу многие ко многим
    // инструктор может вести много групп и у группы может быть много инструкторов
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "groupInstructors",
            joinColumns = @JoinColumn(name = "TrainingGroupId"),
            inverseJoinColumns = @JoinColumn(name = "personId"))
    private Set<Person> instructors;

    // создаем таблицу многие ко многим
    // студент может состоять в  многих группах и группа состоит из многих студентов
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "groupStudents",
            joinColumns = @JoinColumn(name = "TrainingGroupId"),
            inverseJoinColumns = @JoinColumn(name = "studentsId"))
    private Set<Person> students;

    // сейчас вот это надо сделать
    // у группы есть множество уроков.
    @OneToMany(mappedBy="trainingGroup")
    private Set<Lesson> lessons;

    public Set<Lesson> getLessons() {
        return lessons;
    }

    public void setLessons(Set<Lesson> lessons) {
        this.lessons = lessons;
    }

    public Set<Person> getInstructors() {
        return instructors;
    }

    public void setInstructors(Set<Person> instructors) {
        this.instructors = instructors;
    }

    public Set<Person> getStudents() {
        return students;
    }

    public void setStudents(Set<Person> students) {
        this.students = students;
    }


    public TrainingGroup() {
    }

    public DomenDictionary getDomen() {
        return domen;
    }

    public void setDomen(DomenDictionary domen) {
        this.domen = domen;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
