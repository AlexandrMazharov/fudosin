package com.example.demo.controller;

import com.example.demo.exception.ItemNotFoundException;
import com.example.demo.models.Lesson;
import com.example.demo.models.Student;
import com.example.demo.models.TrainingGroup;
import com.example.demo.repos.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = {"http://localhost:4200"})
public class StudentController {
    @Autowired
    StudentRepository studentRepository;

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudent() {
        return ResponseEntity.ok(studentRepository.findAll());
    }

    @GetMapping("/{st-id}/group")
    public ResponseEntity<List<String>> getLessonByGroupAndDate(@PathVariable("st-id") Long id
    ) {
        try {
            Student student = studentRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
            Set<TrainingGroup> groups = student.getGroups();
            List<String> result = new ArrayList<>();
            for (TrainingGroup group : groups) {
                result.add(String.valueOf(group.getId()));
            }
            return ResponseEntity.ok(result);
        } catch (ItemNotFoundException exception) {
            return ResponseEntity.notFound().build();
        }

    }
}
