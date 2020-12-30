package com.example.demo.entity;

import javax.persistence.*;
import java.io.File;
import java.util.Set;

@Table
@Entity
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private File file;

    @ManyToMany(mappedBy = "contents")
    private Set<Domain> damains;

    public Content() {
    }

    public Set<Domain> getDamains() {
        return damains;
    }

    public void setDamains(Set<Domain> damains) {
        this.damains = damains;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

}
