package com.example.demo.models;

import javax.persistence.*;
import java.util.Set;
@Entity
@DiscriminatorValue("1")
public class Student extends Person {

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_group",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id"))
    private Set<TrainingGroup> userGroup;

    @OneToMany
    private Set<Visit> visits;

    public Student() {
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
}
