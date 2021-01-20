package com.example.demo.controller;

import com.example.demo.models.Person;
import com.example.demo.exception.ItemNotFoundException;
import com.example.demo.models.Student;
import com.example.demo.repos.PersonRepository;
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
    public ResponseEntity<String> deleteNote(@PathVariable(value = "id") Long id) throws Throwable {

        Person person = personRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));

        if (person.getParent()!=null && person.getParent().getStudents() != null) {
            return new ResponseEntity<>("Невозможно удалить родителя - он связан с ребенком.", HttpStatus.OK);
        }
        if(person.getStudent()!= null && person.getStudent().getParent()!=null){
            return new ResponseEntity<>("Невозможно удалить студента - он связан с родителем.", HttpStatus.OK);
        }
        if (!person.getInstructor().getTrainingGroups().isEmpty()){
            return new ResponseEntity<>("\"Невозможно удалить инструктора - он ведет некоторые группы.", HttpStatus.OK);
        }
        personRepository.delete(person);
        return new ResponseEntity<>("Пользователь успешно удален!", HttpStatus.OK);
    }

}

