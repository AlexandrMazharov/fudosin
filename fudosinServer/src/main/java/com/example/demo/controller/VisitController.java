package com.example.demo.controller;

import com.example.demo.models.Student;
import com.example.demo.models.Visit;
import com.example.demo.repos.StudentRepository;
import com.example.demo.repos.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/visit")
@CrossOrigin(origins = {"http://localhost:4200"})
public class VisitController {

    @Autowired
    VisitRepository visitRepository;

    @GetMapping
    public ResponseEntity<List<Visit>> getAllVisits() {
        return ResponseEntity.ok(visitRepository.findAll());
    }

}
