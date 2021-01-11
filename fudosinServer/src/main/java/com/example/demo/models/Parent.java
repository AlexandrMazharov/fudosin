package com.example.demo.models;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table
public class Parent  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn
    private Person person;

    @OneToMany
    private Set<Student> children;

    public Parent() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Set<Student> getChildren() {
        return children;
    }

    public void setChildren(Set<Student> children) {
        this.children = children;
    }
}
