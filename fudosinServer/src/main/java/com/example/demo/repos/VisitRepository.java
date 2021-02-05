package com.example.demo.repos;

import com.example.demo.models.Student;
import com.example.demo.models.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Long> {
    List<Visit> findAllByStudentAndLessonTimeStartBetween(Student student, Date lesson_timeStart, Date lesson_timeFinish);

}
