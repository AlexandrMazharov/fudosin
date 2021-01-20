package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    @ManyToMany(mappedBy = "instructors", fetch = FetchType.EAGER)
    private Set<TrainingGroup> trainingGroups = new HashSet<>();

    public Instructor() {
    }

    public Instructor(Person person) {
        this.person = person;
    }

    public void addGroup(TrainingGroup group) {
        this.trainingGroups.add(group);
    }

    // getters setters

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
