package com.example.demo.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
public class Lesson {
    //  занятие
    //  занятие имеет место и время
//    создает таблицу многие
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private Date timeStart;
    private Date timeFinish;
    private String place;
    @ManyToOne
    @JoinColumn(name = "group_id")
    private TrainingGroup trainingGroup;

}
