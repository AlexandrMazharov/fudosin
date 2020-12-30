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
    @JoinColumn
    private Domain domain;

    // создаем таблицу многие ко многим
    // инструктор может вести много групп и у группы может быть много инструкторов
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "group_instructors",
            joinColumns = @JoinColumn(name = "training_group_id"),
            inverseJoinColumns = @JoinColumn(name = "person_id"))
    private Set<Person> instructors;

    // создаем таблицу многие ко многим
    // студент может состоять в  многих группах и группа состоит из многих студентов
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "group_students",
            joinColumns = @JoinColumn(name = "training_group_id"),
            inverseJoinColumns = @JoinColumn(name = "students_id"))
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

    public Domain getDomain() {
        return domain;
    }

    public void setDomain(Domain domen) {
        this.domain = domen;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
