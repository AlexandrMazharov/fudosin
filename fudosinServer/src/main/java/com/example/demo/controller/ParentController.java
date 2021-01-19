package com.example.demo.controller;

import com.example.demo.models.Parent;
import com.example.demo.models.Student;
import com.example.demo.repos.ParentRepository;
import com.example.demo.repos.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/parent")
@CrossOrigin(origins = {"http://localhost:4200"})
public class ParentController {
    @Autowired
    ParentRepository parentRepository;

    @GetMapping
    public ResponseEntity<List<Parent>> getAllStudent() {
        return ResponseEntity.ok(parentRepository.findAll());
    }
}
