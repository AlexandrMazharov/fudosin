package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
public class Instructor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn
    private Person person;

//    @ManyToMany(fetch = FetchType.EAGER,
//            cascade = {CascadeType.ALL})
//    @JoinTable(name = "group_instructors",
//            joinColumns = @JoinColumn(name = "group_id"),
//            inverseJoinColumns = @JoinColumn(name = "instructor_id"))
//    @JsonIgnore
//    private Set<Instructor> instructors = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "instructors", fetch = FetchType.EAGER)
    private Set<TrainingGroup> trainingGroups = new HashSet<>();

    public Instructor() {
    }

    public void addGroup(TrainingGroup group) {
        this.trainingGroups.add(group);
    }

    public Instructor(Person person) {
        this.person = person;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<TrainingGroup> getTrainingGroups() {
        return trainingGroups;
    }

    public void setTrainingGroups(Set<TrainingGroup> trainingGroups) {
        this.trainingGroups = trainingGroups;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }


}
