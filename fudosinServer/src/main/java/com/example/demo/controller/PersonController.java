package com.example.demo.controller;

import com.example.demo.models.Person;
import com.example.demo.exception.ItemNotFoundException;
import com.example.demo.persponse.Roles;
import com.example.demo.repos.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PutMapping("/person/upd/{id}")
    public Person updateNote(@PathVariable(value = "id") Long personId,
                             @Valid
                             @RequestBody Person personDetails) throws Throwable {

        Person person = personRepository.findById(personId)
                .orElseThrow(() -> new ItemNotFoundException(personId));

        person.setId(personDetails.getId());
        person.setFirstName(personDetails.getFirstName());
        person.setLastName(personDetails.getLastName());
        person.setSecondName(personDetails.getSecondName());
        person.setBirthday(personDetails.getBirthday());
        person.setEmail(personDetails.getEmail());
        person.setTelephone(personDetails.getTelephone());
        person.setUserRoles(personDetails.getUserRoles());

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

        personRepository.delete(person);
        return ResponseEntity.ok().build();
    }

}

