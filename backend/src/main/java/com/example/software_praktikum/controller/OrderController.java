package com.example.software_praktikum.controller;

import com.example.software_praktikum.model.Order;
import com.example.software_praktikum.model.Person;
import com.example.software_praktikum.repository.OrderRepository;
import com.example.software_praktikum.repository.PersonRepository;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDate;
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

    @GetMapping("/{OrderID}")
    public Order getOrder(@PathVariable Integer OrderID) {
        return orderRepository.findById(OrderID).orElse(null);
    }

    @GetMapping("/today/{personID}")
    public Order getTodaysOrder(@PathVariable("personID") Integer personID) {

        LocalDate currentDate = LocalDate.now();
        Person person = personRepository.findById(personID).orElse(null);
        List<Order> orders = orderRepository.findByPerson(person);

        for (Order order : orders) {
            if (order.getDate().equals(currentDate)) {
                return order;
            }
        }
        //return empty order if no order with current date is found
        return new Order();
    }


    @DeleteMapping("/delete/{personID}")
    public void deleteOrder(@PathVariable Integer personID) {
        Order order = orderRepository.findById(personID).get();
        orderRepository.delete(order);
    }


    @PutMapping("/create/")
    public Order createOrder(@RequestParam Integer personID,
                             @RequestParam LocalDate date,
                             @RequestParam String meal,
                             @RequestParam String salad) {

        Person person = personRepository.findById(personID).get();
        Order order = new Order();
        order.setPerson(person);
        order.setDate(date);
        order.setMeal(meal);
        order.setSalad(salad);
        order.setLastEdited(Instant.now());

        return orderRepository.save(order);

    }




}
