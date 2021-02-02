package com.example.demo.controller;

import com.example.demo.exception.ItemNotFoundException;
import com.example.demo.models.Student;
import com.example.demo.models.Visit;
import com.example.demo.repos.StudentRepository;
import com.example.demo.repos.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/visit")
@CrossOrigin(origins = {"http://localhost:4200"})
public class VisitController {

    @Autowired
    VisitRepository visitRepository;
    @Autowired
    StudentRepository studentRepository;

    @GetMapping
    public ResponseEntity<List<Visit>> getAllVisits() {
        return ResponseEntity.ok(visitRepository.findAll());
    }

    @GetMapping("/stud")
    public ResponseEntity<?> getVisitsByData(
            @RequestParam Long id,
            @RequestParam Long dateStart,
            @RequestParam Long dateFinish
    ) {
        try {
            Student student = studentRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));

            Calendar start = Calendar.getInstance();
            start.setTimeInMillis(dateStart);
            System.out.println(start.getTime());
            Calendar finish = Calendar.getInstance();
            finish.setTimeInMillis(dateFinish);

            List<Visit> visits = visitRepository.findAllByStudentAndLessonTimeStartBetween(student, start.getTime(), finish.getTime());
            return ResponseEntity.ok(visits);
        } catch (ItemNotFoundException exception) {
            exception.printStackTrace();
            return ResponseEntity.ok("student not found");
        }

    }
}
