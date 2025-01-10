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

    @Column(name = "privilege_level")
    private  Integer privilege_level;

    public User(Integer id, String username, String password, Integer privilege_level) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.privilege_level = privilege_level;
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

    public Integer getprivilege_level() {
        return privilege_level;
    }

    public void setprivilege_level(Integer privilege_level) {
        this.privilege_level = privilege_level;
    }
}