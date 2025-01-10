package com.example.software_praktikum.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "user_groups", indexes = {
        @Index(name = "group_id", columnList = "group_id"),
        @Index(name = "user_id", columnList = "user_id")
})
public class UserGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Automatische ID-Generierung
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public UserGroup(Integer id, Group group, User user) {
        this.id = id;
        this.group = group;
        this.user = user;
    }

    public UserGroup() {
        
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}