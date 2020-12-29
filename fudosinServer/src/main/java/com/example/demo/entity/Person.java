package com.example.demo.entity;


import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String LastName;
    private String SecondName;
    private Date birthday;

    public Person() {
    }

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "userRoles",
            joinColumns = @JoinColumn(name = "userId"),
            inverseJoinColumns = @JoinColumn(name = "roleId"))
    private Set<Role> userRoles;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "userGroup",
            joinColumns = @JoinColumn(name = "userId"),
            inverseJoinColumns = @JoinColumn(name = "groupId"))
    private Set<TrainingGroup> userGroup;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
