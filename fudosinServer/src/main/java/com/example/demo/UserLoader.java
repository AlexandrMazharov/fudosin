package com.example.demo;

import com.example.demo.models.ERole;
import com.example.demo.models.Person;
import com.example.demo.models.Role;
import com.example.demo.repos.PersonRepository;
import com.example.demo.repos.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class UserLoader implements ApplicationRunner {

    private RoleRepository roleRepository;
    private PersonRepository userRepository;
    private PasswordEncoder encoder;

    @Autowired
    public UserLoader(PersonRepository personRepository, RoleRepository roleRepository, PasswordEncoder encoder) {
        this.encoder = encoder;
        this.roleRepository = roleRepository;
        this.userRepository = personRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        insertRoles();
        insertStudent();
        insertParent();
        insertStudentParent();
        insertInstructorUser();
        insertUserAdmin();
    }

    private Set<Role> addStudentRole(Set<Role> roles) {
        Role roleStudent = roleRepository.findByName(ERole.ROLE_STUDENT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(roleStudent);
        return roles;
    }

    private Set<Role> addParentRole(Set<Role> roles) {
        Role roleStudent = roleRepository.findByName(ERole.ROLE_PARENT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(roleStudent);
        return roles;
    }

    private Set<Role> addInstructorRole(Set<Role> roles) {
        Role instrRole = roleRepository.findByName(ERole.ROLE_INSTRUCTOR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(instrRole);
        return roles;
    }

    private Set<Role> addAdminRole(Set<Role> roles) {
        Role instrRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(instrRole);
        return roles;
    }

    private void insertStudentParent() {
        String username = "studentParent@email.ru";
        String email = "studentParent@email.ru";
        String password = "studentParent@email.ru";
        System.out.println("STUDENT,PARENT: username: " + username + " email: " + email + " password: " + password);
        if (!userRepository.existsByUsername(username) & (!userRepository.existsByEmail(email))) {
            Person user = new Person(username, email, encoder.encode(password));
            Set<Role> roles = new HashSet<>();
            addStudentRole(roles);
            addParentRole(roles);
            user.setUserRoles(roles);
            userRepository.save(user);
        }
    }

    private void insertStudent() {
        String username = "student@email.ru";
        String email = "student@email.ru";
        String password = "student@email.ru";
        System.out.println("STUDENT: username: " + username + " email: " + email + " password: " + password);
        if (!userRepository.existsByUsername(username) & (!userRepository.existsByEmail(email))) {
            Person user = new Person(username, email, encoder.encode(password));
            Set<Role> roles = new HashSet<>();
            addStudentRole(roles);
            user.setUserRoles(roles);
            userRepository.save(user);
        }
    }

    private void insertRoles() {
        if (roleRepository.count() != ERole.values().length) {
            for (ERole role : ERole.values()) {
                roleRepository.save(new Role(role));
            }
        }
    }

    private void insertParent() {
        String username = "parent@email.ru";
        String email = "parent@email.ru";
        String password = "parent@email.ru";
        System.out.println("PARENT: username: " + username + " email: " + email + " password: " + password);
        if (!userRepository.existsByUsername(username) & (!userRepository.existsByEmail(email))) {
            Person user = new Person(username, email, encoder.encode(password));
            Set<Role> roles = new HashSet<>();
            addParentRole(roles);
            user.setUserRoles(roles);
            userRepository.save(user);
        }
    }

    private void insertInstructorUser() {
        String username = "instructor@email.ru";
        String email = "instructor@email.ru";
        String password = "instructor@email.ru";

        System.out.println("INSTRUCTOR: username: " + username + " email: " + email + " password: " + password);
        if (!userRepository.existsByUsername(username) & (!userRepository.existsByEmail(email))) {
            Person user = new Person(username, email, encoder.encode(password));
            Set<Role> roles = new HashSet<>();
            addStudentRole(roles);
            addParentRole(roles);
            addInstructorRole(roles);
            user.setUserRoles(roles);
            userRepository.save(user);
        }
    }

    private void insertUserAdmin() {
        String username = "admin@email.ru";
        String email = "admin@email.ru";
        String password = "admin@email.ru";
        System.out.println("ADMIN: username: " + username + " email: " + email + " password: " + password);
        if (!userRepository.existsByUsername(username) & (!userRepository.existsByEmail(email))) {
            Person user = new Person(username, email, encoder.encode("admin@email.ru"));
            Set<Role> roles = new HashSet<>();
            addStudentRole(roles);
            addParentRole(roles);
            addInstructorRole(roles);
            addAdminRole(roles);
            user.setUserRoles(roles);
            userRepository.save(user);
        }
    }
}

