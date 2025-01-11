package com.example.software_praktikum.controller;

import com.example.software_praktikum.model.Order;
import com.example.software_praktikum.model.Person;
import com.example.software_praktikum.repository.OrderRepository;
import com.example.software_praktikum.repository.PersonRepository;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

/*

Handles all requests related to Order

 */


@RestController
@RequestMapping("/order/")
public class OrderController {
    private final OrderRepository orderRepository;
    private final PersonRepository personRepository;

    public OrderController(OrderRepository orderRepository, PersonRepository personRepository) {
        this.orderRepository = orderRepository;
        this.personRepository = personRepository;
    }

    @GetMapping("")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }


}
