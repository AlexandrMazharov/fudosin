package com.example.demo.controller;

import com.example.demo.exception.ItemNotFoundException;
import com.example.demo.models.Parent;
import com.example.demo.models.Student;
import com.example.demo.repos.ParentRepository;
import com.example.demo.repos.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/parent")
@CrossOrigin(origins = {"http://localhost:4200"})
public class ParentController {
    @Autowired
    ParentRepository parentRepository;

    @GetMapping
    public ResponseEntity<List<Parent>> getAllParent() {
        return ResponseEntity.ok(parentRepository.findAll());
    }
    @GetMapping("/{id}/students")
    public ResponseEntity<List<Student>> getStudentByParent(@PathVariable( value="id") Long id) {
        try {
            Parent parent = parentRepository.findById(id).orElseThrow(()-> new ItemNotFoundException(id));
            List<Student> students = new ArrayList<>(parent.getStudents());
            return ResponseEntity.ok(students);
        } catch (ItemNotFoundException exception) {
            exception.printStackTrace();
            return ResponseEntity.notFound().build();
        }

    }
}
