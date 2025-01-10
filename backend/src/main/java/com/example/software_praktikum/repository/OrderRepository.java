package com.example.software_praktikum.repository;

import com.example.software_praktikum.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.software_praktikum.model.Order;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    public Order findByPerson(Person person);
}
