package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn
    private Person person;

    @JsonIgnore
    @OneToMany
    private Set<Student> students = new HashSet<>(0);

    public Parent() {
    }
    public Parent(Person p) {
        this.person = p;
    }

    public void addStudent(Student student){
        students.add(student);
    }

    // getters setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> children) {
        this.students = children;
    }
}
