package com.example.demo.controller;

import com.example.demo.models.Student;
import com.example.demo.repos.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
