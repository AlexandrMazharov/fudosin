package com.example.demo.controller;

import com.example.demo.models.Domain;
import com.example.demo.repos.DomainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/domain")
@CrossOrigin(origins = {"http://localhost:4200"})
public class DomainController {
    @Autowired
    DomainRepository domainRepository;

    @GetMapping
    public ResponseEntity<List<Domain>> getAllDomain() {
        return ResponseEntity.ok(domainRepository.findAll());
    }

}
