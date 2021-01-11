package com.example.demo.models;

import javax.persistence.*;
import java.util.Set;
@Entity
@Table
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn
    private Person person;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_group",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id"))
    private Set<TrainingGroup> userGroup;

    @OneToMany
    private Set<Visit> visits;

    public Student() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Visit> getVisits() {
        return visits;
    }

    public void setVisits(Set<Visit> visits) {
        this.visits = visits;
    }

    public Set<TrainingGroup> getUserGroup() {
        return userGroup;
    }

    public void setUserGroup(Set<TrainingGroup> userGroup) {
        this.userGroup = userGroup;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}
