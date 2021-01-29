package com.example.demo.repos;

import com.example.demo.models.Lesson;
import com.example.demo.models.Student;
import com.example.demo.models.TrainingGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    Boolean existsLessonByTrainingGroup(TrainingGroup group);


    List<Lesson> findAllByTimeStartBetween(Date start, Date finish);
    List<Lesson> findAllByTrainingGroupAndTimeStartBetween(TrainingGroup trainingGroup,  Date start, Date finish);
    }
