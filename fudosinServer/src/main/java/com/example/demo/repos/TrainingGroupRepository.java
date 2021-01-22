package com.example.demo.repos;

import com.example.demo.models.Domain;
import com.example.demo.models.ERole;
import com.example.demo.models.Role;
import com.example.demo.models.TrainingGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingGroupRepository extends JpaRepository<TrainingGroup, Long> {
    Boolean existsTrainingGroupByDomain(Domain domain);
}
