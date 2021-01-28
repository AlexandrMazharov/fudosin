package com.example.demo.repos;

import com.example.demo.models.Student;
import com.example.demo.models.TrainingGroup;
import com.example.demo.models.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Long> {

}
