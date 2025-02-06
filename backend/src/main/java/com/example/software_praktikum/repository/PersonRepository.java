package com.example.software_praktikum.repository;

import com.example.software_praktikum.model.Group;
import com.example.software_praktikum.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository extends JpaRepository<Person, Integer> {

    Person findByGroup(Group group);

    List<Person> findAllByGroup(Group group);
}
