package com.example.software_praktikum.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "orders", indexes = {
        @Index(name = "person_id", columnList = "person_id")
})
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "choice_id", nullable = false)
    private Integer id;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Lob
    @Column(name = "meal")
    private String meal;

    @ColumnDefault("'nein'")
    @Lob
    @Column(name = "salad", nullable = false)
    private String salad;

    @ColumnDefault("current_timestamp()")
    @Column(name = "last_edited", nullable = false)
    private Instant lastEdited;

}