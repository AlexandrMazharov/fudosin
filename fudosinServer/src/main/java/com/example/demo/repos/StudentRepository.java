package com.example.demo.repos;

import com.example.demo.models.Student;
import com.example.demo.models.TrainingGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Set<Student> findAllByGroups(TrainingGroup group);

}
