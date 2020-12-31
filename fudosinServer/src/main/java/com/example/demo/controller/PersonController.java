package com.example.demo.controller;

import com.example.demo.entity.Person;
import com.example.demo.exception.ItemNotFoundException;
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
    public Person getNoteById(@PathVariable(value = "id") Long carId) throws Throwable {
        return personRepository.findById(carId)
                .orElseThrow(() -> new ItemNotFoundException(carId));
    }

    @PutMapping("/cars/upd/{id}")
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
        person.setVisits(personDetails.getVisits());
        person.setUserGroup(personDetails.getUserGroup());
        person.setUserRoles(personDetails.getUserRoles());

        Person updatePerson = personRepository.save(person);

        return updatePerson;
    }

    @PostMapping
    public Person createNote(@Valid @RequestBody Person person) {
        return personRepository.save(person);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteNote(@PathVariable(value = "id") Long carId) throws Throwable {

        Person person = personRepository.findById(carId)
                .orElseThrow(() -> new ItemNotFoundException(carId));

        personRepository.delete(person);
        return ResponseEntity.ok().build();
    }

}

