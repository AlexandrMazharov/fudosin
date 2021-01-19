package com.example.demo.controller;

import com.example.demo.models.TrainingGroup;
import com.example.demo.repos.TrainingGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
    @RequestMapping("/group")
public class TrainingGroupController {
    @Autowired
    TrainingGroupRepository trainingGroupRepository;

    @GetMapping
    public ResponseEntity<List<TrainingGroup>> getAllTrainingGroup() {
        return ResponseEntity.ok(trainingGroupRepository.findAll());
    }

}
