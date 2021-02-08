package com.example.demo.controller;

import com.example.demo.models.ERole;
import com.example.demo.models.Person;
import com.example.demo.exception.ItemNotFoundException;
import com.example.demo.repos.PersonRepository;
import com.example.demo.repos.RoleRepository;
import com.example.demo.security.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/person")
@CrossOrigin(origins = {"http://localhost:4200"})
public class PersonController {
    @Autowired
    PersonRepository personRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    AdministratorRepository administratorRepository;

    @GetMapping
    public ResponseEntity<List<Person>> getlAllNotes() {
        return ResponseEntity.ok(personRepository.findAll());
    }

    @GetMapping("/{id}")
    public Person getNoteById(@PathVariable(value = "id") Long id) throws Throwable {
        return personRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));
    }

    @GetMapping("/{id}/roles")
    public Roles getRolesById(@PathVariable(value = "id") Long id) throws Throwable {
        Person person = personRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
        Roles roles = new Roles();
        if (person.getStudent() != null) roles.setStudent(person.getStudent().getId());
        if (person.getParent() != null) roles.setParent(person.getParent().getId());
        if (person.getInstructor() != null) roles.setInstructor(person.getInstructor().getId());
        if (person.getAdministrator() != null) roles.setAdministrator(person.getAdministrator().getId());
        return roles;
    }


    @PutMapping("/upd/{id}")
    public Person updateNote(@PathVariable(value = "id") Long personId,
                             @Valid
                             @RequestBody Person personDetails) throws Throwable {

        Person person = personRepository.findById(personId)
                .orElseThrow(() -> new ItemNotFoundException(personId));

        person.setId(personDetails.getId());
        person.setDegree(personDetails.getDegree());
        person.setFirstName(personDetails.getFirstName());
        person.setLastName(personDetails.getLastName());
        person.setSecondName(personDetails.getSecondName());
        person.setBirthday(personDetails.getBirthday());
        person.setEmail(personDetails.getEmail());
        person.setTelephone(personDetails.getTelephone());
        person.setUserRoles(personDetails.getUserRoles());
        System.out.println(person.toString());
        Person updatePerson = personRepository.save(person);

        return updatePerson;
    }


    @PostMapping
    public Person createNote(@Valid @RequestBody Person person) {
        return personRepository.save(person);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteNote(@PathVariable(value = "id") Long id) throws Throwable {

        Person person = personRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));

        if (person.getStudent() != null && person.getStudent().getParent() != null) {
            return new ResponseEntity<>("Невозможно удалить студента - он связан с родителем.", HttpStatus.OK);
        }
        if (person.getInstructor() != null && !person.getInstructor().getTrainingGroups().isEmpty()) {
            return new ResponseEntity<>("Невозможно удалить инструктора - он ведет некоторые группы.", HttpStatus.OK);
        }
        personRepository.delete(person);
        return new ResponseEntity<>("Пользователь успешно удален!", HttpStatus.OK);
    }

    @PostMapping("remove/{personid}/{role}")
    public ResponseEntity<?> removeRole(@PathVariable(value = "role") String role,
                                        @PathVariable(value = "personid") Long personId) {
        try {
            Person person = personRepository.findById(personId).orElseThrow(() -> new ItemNotFoundException(personId));
            Role findedRole = findRoleByName(role);
            if (findedRole == null) {
                return ResponseEntity.ok(new MessageResponse("Role not found!"));
            }

//            administratorRepository.delete(person.getAdministrator());
            person.removeRole(findedRole);
            personRepository.save(person);
            return ResponseEntity.ok(new MessageResponse("Role removed!"));


        } catch (ItemNotFoundException exception) {
            exception.printStackTrace();
            return ResponseEntity.ok(new MessageResponse("Person not found!"));
        }


    }

    private Role findRoleByName(String role) {
        role = "ROLE_" + role;
        Role findedRole = null;
        switch (role) {
            case "ROLE_STUDENT":
                findedRole = roleRepository.findByName(ERole.ROLE_STUDENT).orElseThrow();
                break;
            case "ROLE_PARENT":
                findedRole = roleRepository.findByName(ERole.ROLE_PARENT).orElseThrow();
                break;
            case "ROLE_INSTRUCTOR":
                findedRole = roleRepository.findByName(ERole.ROLE_INSTRUCTOR).orElseThrow();
                break;
            case "ROLE_ADMIN":
                findedRole = roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow();
                break;
        }
        return findedRole;

    }

    @PostMapping("/upd/{personid}/{role}")
    public ResponseEntity<?> setRole(@PathVariable(value = "role") String role,
                                     @PathVariable(value = "personid") Long personId) {
        try {
            Role findedRole = findRoleByName(role);
            if (findedRole == null) {
                return ResponseEntity.ok(new MessageResponse("Role not found!"));
            }
//            role = "ROLE_" + role;
//            Role findedRole;
//            if (role.equals("ROLE_STUDENT")) {
//                findedRole = roleRepository.findByName(ERole.ROLE_STUDENT).orElseThrow();
//            } else if (role.equals("ROLE_PARENT")) {
//                findedRole = roleRepository.findByName(ERole.ROLE_PARENT).orElseThrow();
//            } else if (role.equals("ROLE_INSTRUCTOR")) {
//                findedRole = roleRepository.findByName(ERole.ROLE_INSTRUCTOR).orElseThrow();
//            } else if (role.equals("ROLE_ADMIN")) {
//                findedRole = roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow();
//            } else {
//                return ResponseEntity.ok(new MessageResponse("Role not found!"));
//            }

            Person person = personRepository.findById(personId).orElseThrow(() -> new ItemNotFoundException(personId));

            person.addRole(findedRole);
            personRepository.save(person);
            return ResponseEntity.ok(new MessageResponse("Role added successfully!"));

        } catch (ItemNotFoundException exception) {
            exception.printStackTrace();
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("person not Found!"));
        }
    }
}


