package com.example.software_praktikum.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @Column(name = "username", nullable = false, length = 50)
    private String username;

    @Column(name = "password", nullable = false, length = 50)
    private String password;

    @Column(name = "privilegeLevel")
    private  Integer privilegeLevel;

    public User(Integer id, String username, String password, Integer privilegeLevel) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.privilegeLevel = privilegeLevel;
    }

    public User() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Integer getPrivilegeLevel() {
        return privilegeLevel;
    }

    public void setPrivilegeLevel(Integer privilegeLevel) {
        this.privilegeLevel = privilegeLevel;
    }
}