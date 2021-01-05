package com.example.demo.models;

import javax.persistence.*;
import java.util.Set;

@Table
@Entity
public class TrainingGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private Domain domain;



    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "group_students",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "students_id"))
    private Set<Student> students;

    @OneToMany(mappedBy = "trainingGroup")
    private Set<Lesson> lessons;

    public TrainingGroup() {
    }

    public Set<Lesson> getLessons() {
        return lessons;
    }

    public void setLessons(Set<Lesson> lessons) {
        this.lessons = lessons;
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

    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }
}
