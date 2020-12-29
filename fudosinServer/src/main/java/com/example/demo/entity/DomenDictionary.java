package com.example.demo.entity;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table
public class DomenDictionary {
    // домен. карате айкидо, джиуджуцу
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String domenName;

    @OneToMany(mappedBy = "domen", fetch = FetchType.EAGER)
    private Set<TrainingGroup> domen;

    public DomenDictionary() {
    }

    public String getDomenName() {
        return domenName;
    }

    public void setDomenName(String domenName) {
        this.domenName = domenName;
    }

    public Set<TrainingGroup> getDomen() {
        return domen;
    }

    public void setDomen(Set<TrainingGroup> domen) {
        this.domen = domen;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


}
