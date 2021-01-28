package com.example.demo.controller;

import com.example.demo.models.ERole;
import com.example.demo.models.Person;
import com.example.demo.exception.ItemNotFoundException;
import com.example.demo.models.Role;
import com.example.demo.models.Student;
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

    @GetMapping
    public ResponseEntity<List<Person>> getlAllNotes() {
        return ResponseEntity.ok(personRepository.findAll());
    }

    @GetMapping("/{id}")
    public Person getNoteById(@PathVariable(value = "id") Long id) throws Throwable {
        return personRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));
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

  /*      if (person.getParent()!=null && person.getParent().getStudents() != null) {
            return new ResponseEntity<>("Невозможно удалить родителя - он связан с ребенком.", HttpStatus.OK);
        }*/
        if (person.getStudent() != null && person.getStudent().getParent() != null) {
            return new ResponseEntity<>("Невозможно удалить студента - он связан с родителем.", HttpStatus.OK);
        }
        if (person.getInstructor() != null && !person.getInstructor().getTrainingGroups().isEmpty()) {
            return new ResponseEntity<>("Невозможно удалить инструктора - он ведет некоторые группы.", HttpStatus.OK);
        }
        personRepository.delete(person);
        return new ResponseEntity<>("Пользователь успешно удален!", HttpStatus.OK);
    }

    @PostMapping("/upd/{personid}/{role}")
    public ResponseEntity<?> setRole(@PathVariable(value = "role") String role,
                                     @PathVariable(value = "personid") Long personId) {
        try {
            role = "ROLE_" + role;
            Role findedRole;
            if (role.equals("ROLE_STUDENT")) {
                findedRole = roleRepository.findByName(ERole.ROLE_STUDENT).orElseThrow();
            } else if (role.equals("ROLE_PARENT")) {
                findedRole = roleRepository.findByName(ERole.ROLE_PARENT).orElseThrow();
            } else if (role.equals("ROLE_INSTRUCTOR")) {
                findedRole = roleRepository.findByName(ERole.ROLE_INSTRUCTOR).orElseThrow();
            } else if (role.equals("ROLE_ADMIN")) {
                findedRole = roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow();
            } else {
                return ResponseEntity.ok(new MessageResponse("Role not found!"));
            }

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


