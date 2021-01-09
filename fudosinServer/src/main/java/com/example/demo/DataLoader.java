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
public class DataLoader implements ApplicationRunner {

    private RoleRepository roleRepository;
    private PersonRepository userRepository;
    private PasswordEncoder encoder;

    @Autowired
    public DataLoader(PersonRepository personRepository, RoleRepository roleRepository, PasswordEncoder encoder) {
        this.encoder = encoder;
        this.roleRepository = roleRepository;
        this.userRepository = personRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        insertRoles();
        insertUserAdmin();
    }

    private void insertRoles() {
        if (roleRepository.count() != ERole.values().length) {
            for (ERole role : ERole.values()) {
                roleRepository.save(new Role(role));
            }
        }
    }

    private void insertUserAdmin() {
        System.out.println("ADMIN USER: USERNAME: admin@email.ru EMAIL: admin@email.ru PASSWORD: admin@email.ru");
        if (!userRepository.existsByUsername("admin@email.ru") & (!userRepository.existsByEmail("admin@email.ru"))) {
            Person user = new Person(
                    "admin@email.ru",
                    "admin@email.ru",
                    encoder.encode("admin@email.ru"));

            Set<Role> roles = new HashSet<>();

            Role userRole = roleRepository.findByName(ERole.ROLE_STUDENT)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);

            Role parRole = roleRepository.findByName(ERole.ROLE_PARENT)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(parRole);

            Role instrRole = roleRepository.findByName(ERole.ROLE_INSTRUCTOR)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(instrRole);

            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);


            user.setUserRoles(roles);
            userRepository.save(user);
        }
    }
}

