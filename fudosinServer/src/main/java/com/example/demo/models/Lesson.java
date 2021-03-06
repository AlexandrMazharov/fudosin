package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date timeStart;
    private Date timeFinish;
    private String place;

    @ManyToOne
    @JoinColumn
    private TrainingGroup trainingGroup;

    @JsonIgnore
    @OneToMany(mappedBy = "lesson")
    private Set<Visit> visits;

    public Lesson() {
    }

    public Lesson(Date timeStart, Date timeFinish, String place, TrainingGroup trainingGroup) {
        this.timeStart = timeStart;
        this.timeFinish = timeFinish;
        this.place = place;
        this.trainingGroup = trainingGroup;
    }

    // getters setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(Date timeStart) {
        this.timeStart = timeStart;
    }

    public Date getTimeFinish() {
        return timeFinish;
    }

    public void setTimeFinish(Date timeFinish) {
        this.timeFinish = timeFinish;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public TrainingGroup getTrainingGroup() {
        return trainingGroup;
    }

    public void setTrainingGroup(TrainingGroup trainingGroup) {
        this.trainingGroup = trainingGroup;
    }

    public Set<Visit> getVisits() {
        return visits;
    }

    public void setVisits(Set<Visit> visits) {
        this.visits = visits;
    }

}
