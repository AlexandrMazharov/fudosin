package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn
    private Person person;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    @ManyToMany(mappedBy = "students")
    private Set<TrainingGroup> groups = new HashSet<>();

    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private Set<Visit> visits = new HashSet<>();


    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn
    private Parent parent;

    public Student() {
    }

    public Student(Person p) {
        this.person = p;
    }

    public void addTrainingGroup(TrainingGroup group) {
        this.groups.add(group);
    }

    // getters and setters


    public Parent getParent() {
        return parent;
    }

    public void setParent(Parent parent) {
        this.parent = parent;
    }

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

    public Set<TrainingGroup> getGroups() {
        return groups;
    }

    public void setGroups(Set<TrainingGroup> groups) {
        this.groups = groups;
    }

    public Set<Visit> getVisits() {
        return visits;
    }

    public void setVisits(Set<Visit> visits) {
        this.visits = visits;
    }

}
