package com.example.demo.models;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table
public class Domain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "domain", fetch = FetchType.EAGER)
    private Set<TrainingGroup> domain;

    public Domain() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<TrainingGroup> getDomain() {
        return domain;
    }

    public void setDomain(Set<TrainingGroup> domain) {
        this.domain = domain;
    }
}