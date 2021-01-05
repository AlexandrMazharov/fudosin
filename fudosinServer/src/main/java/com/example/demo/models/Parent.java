package com.example.demo.models;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class Parent extends Person {

    @OneToMany
    private Set<Student> children;

    public Parent() {
    }
}
