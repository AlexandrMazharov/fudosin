package com.example.demo.controller;

import com.example.demo.models.Lesson;
import com.example.demo.models.Student;
import com.example.demo.models.TrainingGroup;
import com.example.demo.repos.LessonRepository;
import com.example.demo.repos.StudentRepository;
import com.example.demo.repos.TrainingGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/lesson")
public class LessonController {
    @Autowired
    LessonRepository lessonRepository;
    @Autowired
    TrainingGroupRepository trainingGroupRepository;
    @Autowired
    StudentRepository studentRepository;

    @GetMapping
    public ResponseEntity<List<Lesson>> getAllLessons() {
        return ResponseEntity.ok(lessonRepository.findAll());
    }


    @GetMapping("/group")
    public ResponseEntity<List<Lesson>> getLessonByGroupAndDate(@RequestParam Long id,
                                                                @RequestParam int year,
                                                                @RequestParam int month) {
        // get all lesson  in the selected month and group
        if (!trainingGroupRepository.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        TrainingGroup trainingGroup = trainingGroupRepository.findById(id).get();

        Calendar start = new GregorianCalendar();
        start.set(Calendar.YEAR, year);
        start.set(Calendar.MONTH, month);
        start.set(Calendar.DAY_OF_MONTH, 1);
        start.set(Calendar.HOUR_OF_DAY, 0);
        start.set(Calendar.MINUTE, 0);
        start.set(Calendar.SECOND, 0);
        System.out.println(start.getTime());

        Calendar finish = (Calendar) start.clone();
        finish.add(Calendar.MONTH, 1);
        finish.add(Calendar.DATE, -1);
        finish.set(Calendar.HOUR_OF_DAY, 23);
        finish.set(Calendar.MINUTE, 59);
        finish.set(Calendar.SECOND, 59);
        System.out.println(finish.getTime());

        List<Lesson> lessons = lessonRepository.findAllByTrainingGroupAndTimeStartBetween(trainingGroup, start.getTime(), finish.getTime());
        return ResponseEntity.ok(lessons);
    }

    @GetMapping
    public ResponseEntity<List<Lesson>> getLessonByDate(@RequestParam int year,
                                                        @RequestParam int month
    ) {
        // get all lesson classes in the selected month
        List<TrainingGroup> trainingGroups = trainingGroupRepository.findAll();

        Calendar start = new GregorianCalendar();
        start.set(Calendar.YEAR, year);
        start.set(Calendar.MONTH, month);
        start.set(Calendar.DAY_OF_MONTH, 1);

        start.set(Calendar.HOUR_OF_DAY, 0);
        start.set(Calendar.MINUTE, 0);
        start.set(Calendar.SECOND, 0);
        System.out.println(start.getTime());

        Calendar finish = (Calendar) start.clone();
        finish.add(Calendar.MONTH, 1);
        finish.add(Calendar.DATE, -1);
        finish.set(Calendar.HOUR_OF_DAY, 23);
        finish.set(Calendar.MINUTE, 59);
        finish.set(Calendar.SECOND, 59);
        System.out.println(finish.getTime());

        List<Lesson> lessons = lessonRepository.findAllByTimeStartBetween(start.getTime(), finish.getTime());
        return ResponseEntity.ok(lessons);
    }

}
