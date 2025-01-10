package com.example.software_praktikum.repository;

import com.example.software_praktikum.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Integer> {
}
