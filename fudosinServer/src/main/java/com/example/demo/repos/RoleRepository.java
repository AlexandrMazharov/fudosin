package com.example.demo.repos;

import com.example.demo.entity.ERole;
import com.example.demo.entity.Person;
import com.example.demo.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository  extends JpaRepository<Role,Long> {
    Optional<Role> findByName(ERole name);
}
