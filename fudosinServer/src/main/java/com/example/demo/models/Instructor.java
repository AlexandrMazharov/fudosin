package com.example.demo.models;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Instructor extends Person {


    public Instructor() {
    }

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "group_instructors",
            joinColumns = @JoinColumn(name = "training_group_id"),
            inverseJoinColumns = @JoinColumn(name = "instructor_id"))
    private Set<TrainingGroup> instructors;

    public Set<TrainingGroup> getInstructors() {
        return instructors;
    }

    public void setInstructors(Set<TrainingGroup> instructors) {
        this.instructors = instructors;
    }
}
