package com.example.demo.repos;

import com.example.demo.models.Lesson;
import com.example.demo.models.TrainingGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    Boolean existsLessonByTrainingGroup(TrainingGroup group);
}
