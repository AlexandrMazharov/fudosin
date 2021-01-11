package com.example.demo.models;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table
public class Instructor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn
    private Person person;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "group_instructors",
            joinColumns = @JoinColumn(name = "training_group_id"),
            inverseJoinColumns = @JoinColumn(name = "instructor_id"))
    private Set<TrainingGroup> instructors;

    public Instructor() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<TrainingGroup> getInstructors() {
        return instructors;
    }

    public void setInstructors(Set<TrainingGroup> instructors) {
        this.instructors = instructors;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }


}
