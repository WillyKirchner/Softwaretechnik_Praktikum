package com.example.software_praktikum.repository;

import com.example.software_praktikum.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.software_praktikum.model.Order;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    public List<Order> findByPerson(Person person);
}
