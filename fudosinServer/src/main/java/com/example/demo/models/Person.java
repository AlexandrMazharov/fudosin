package com.example.demo.models;


import com.example.demo.repos.AdministratorRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;
import net.bytebuddy.implementation.ExceptionMethod;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String SecondName;
    private Date birthday;
    private String email;
    private String telephone;
    private String username;
    private String password;
    private String degree;

    //    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Student student;

    //    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Parent parent;

    //    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Instructor instructor;

    //    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Administrator administrator;

    public Person() {
    }

    //    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> userRoles;

    public Person(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // getters setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getSecondName() {
        return SecondName;
    }

    public void setSecondName(String secondName) {
        SecondName = secondName;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Set<Role> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<Role> userRoles) {
        this.userRoles = userRoles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Student getStudent() {
        return student;
    }

    public Parent getParent() {
        return parent;
    }


    public Instructor getInstructor() {
        return instructor;
    }

    public void setInstructor(Instructor instructorId) {
        this.instructor = instructorId;
    }

    public Administrator getAdministrator() {
        return administrator;
    }

    public void setAdministrator(Administrator administratorId) {
        this.administrator = administratorId;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public void setStudent(Student studentId) {
        this.student = studentId;
    }

    public void setParent(Parent parentId) {
        this.parent = parentId;
    }

    public void addRole(Role findedRole) {
        if (findedRole.getName() == ERole.ROLE_STUDENT) {
            if (this.getStudent() == null) {
                Student student = new Student();
                student.setPerson(this);
                this.setStudent(student);

                this.userRoles.add(findedRole);
            } else {
                System.out.println("The user is already a student");
            }
        }
        if (findedRole.getName() == ERole.ROLE_PARENT) {
            if (this.getParent() == null) {
                Parent p = new Parent();
                p.setPerson(this);
                this.setParent(p);

                this.userRoles.add(findedRole);
            } else {
                System.out.println("The user is already a parent");
            }
        }
        if (findedRole.getName() == ERole.ROLE_INSTRUCTOR) {
            if (this.getInstructor() == null) {
                Instructor instructor = new Instructor();
                instructor.setPerson(this);
                this.setInstructor(instructor);

                this.userRoles.add(findedRole);
            } else {
                System.out.println("The user is already a instructor");
            }
        }
        if (findedRole.getName() == ERole.ROLE_ADMIN) {
            if (this.getAdministrator() == null) {
                Administrator administrator = new Administrator();
                administrator.setPerson(this);
                this.setAdministrator(administrator);

                this.userRoles.add(findedRole);
            } else {
                System.out.println("The user is already a admin");
            }
        }

    }

    public void removeRole(Role findedRole) {

        if (findedRole.getName() == ERole.ROLE_STUDENT) {
            if (this.student != null) {
                if(this.student.getParent()!=null) {
                    this.student.getParent().getStudents().remove(this.student);
                }
                this.student = null;
                this.userRoles.remove(findedRole);
            }
        }
        if (findedRole.getName() == ERole.ROLE_PARENT) {
            if( this.parent!=null){
            if( this.parent.getStudents()!=null){
                Set<Student> students = this.parent.getStudents();
                for (Student stud : students) {
                    stud.setParent(null);
                }
            }}
            this.parent = null;
            this.userRoles.remove(findedRole);

        }
        if (findedRole.getName() == ERole.ROLE_INSTRUCTOR) {
            this.instructor = null;
            this.userRoles.remove(findedRole);

        }
        if (findedRole.getName() == ERole.ROLE_ADMIN) {
            this.administrator = null;
            this.userRoles.remove(findedRole);

        }
    }

}
