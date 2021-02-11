package com.example.demo.controller;

import com.example.demo.models.Role;
import com.example.demo.repos.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/role")
public class RoleController {
    @Autowired
    RoleRepository roleRepository;

    @GetMapping
    public ResponseEntity<List<Role>> getAllRoles(){
        return ResponseEntity.ok(roleRepository.findAll());

    }
    @GetMapping("/{name}")
    public Optional<Role> getRoles(@PathVariable (value="name") String name){
        return roleRepository.findByName(name);

    }

}
