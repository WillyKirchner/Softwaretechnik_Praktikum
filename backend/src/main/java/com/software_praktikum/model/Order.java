package com.software_praktikum.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @Column(name = "choice_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "person_id", nullable = false)
    private Person person;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Lob
    @Column(name = "meal")
    private String meal;

    @NotNull
    @Lob
    @Column(name = "salad", nullable = false)
    private Boolean salad;

    @NotNull
    @ColumnDefault("current_timestamp()")
    @Column(name = "last_edited", nullable = false)
    private Instant lastEdited;

    public Order(Integer id, Person person, LocalDate date, String meal, Boolean salad, Instant lastEdited) {
        this.id = id;
        this.person = person;
        this.date = date;
        this.meal = meal;
        this.salad = salad;
        this.lastEdited = lastEdited;
    }

    public Order(Person person, LocalDate date, String meal, Boolean salad) {
        this.person = person;
        this.date = date;
        this.meal = meal;
        this.salad = salad;
    }

    public Order() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getMeal() {
        return meal;
    }

    public void setMeal(String meal) {
        this.meal = meal;
    }

    public Boolean getSalad() {
        return salad;
    }

    public void setSalad(Boolean salad) {
        this.salad = salad;
    }

    public Instant getLastEdited() {
        return lastEdited;
    }

    public void setLastEdited(Instant lastEdited) {
        this.lastEdited = lastEdited;
    }
}