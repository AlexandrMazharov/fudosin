package com.example.demo.models;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("4")
public class Administrator extends Person {
    public Administrator() {
    }

}
