package com.software_praktikum.controller;

import com.software_praktikum.model.Order;
import com.software_praktikum.model.Person;
import com.software_praktikum.repository.OrderRepository;
import com.software_praktikum.repository.PersonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/*

Handles all requests related to Order

TODO: return JSON-formatted error messages

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

        return orderRepository.findById(OrderID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Bestellung nicht gefunden"));
    }

    @GetMapping("/date")
    public List<Order> getOrdersByDate(@RequestParam LocalDate date) {
        return orderRepository.getOrdersByDate(date);
    }


    @GetMapping("/today/{personID}")
    public Order getTodaysOrder(@PathVariable("personID") Integer personID) {

        LocalDate currentDate = LocalDate.now();
        Person person = personRepository.findById(personID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Person nicht gefunden"));
        List<Order> orders = orderRepository.findByPerson(person);

        for (Order order : orders) {
            if (order.getDate().equals(currentDate)) {
                return order;
            }
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bestellung nicht gefunden");
    }


    @DeleteMapping("/delete/{personID}")
    public void deleteOrder(@PathVariable Integer personID) {
        Order order = orderRepository.findById(personID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Person nicht gefunden"));
        orderRepository.delete(order);
    }


    @PutMapping("/create/")
    public Order createOrder(@RequestParam Integer personID,
                             @RequestParam LocalDate date,
                             @RequestParam String meal,
                             @RequestParam Boolean salad) {

        Person person = personRepository.findById(personID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Person nicht gefunden"));
        Order order = new Order();
        order.setPerson(person);
        order.setDate(date);
        order.setMeal(meal);
        order.setSalad(salad);
        order.setLastEdited(Instant.now());

        return orderRepository.save(order);

    }

    @PutMapping("/create/json/")
    public Order createOrderByJson(@RequestParam Order order) {
        return orderRepository.save(order);
    }

    @PutMapping("/update/")
    public Order updateOrder(@RequestParam Integer personID,
                             @RequestParam LocalDate date,
                             @RequestParam String meal,
                             @RequestParam Boolean salad,
                             @RequestParam Integer orderID) {

        Person person = personRepository.findById(personID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Person nicht gefunden"));
        List<Order> orders = orderRepository.findByPerson(person);
        Order changed_order;
        for (Order order : orders) {
            if (order.getId().equals(orderID)) {
                changed_order = order;
                if (date != null) changed_order.setDate(date);
                if (meal != null) changed_order.setMeal(meal);
                if (salad != null) changed_order.setSalad(salad);
                changed_order.setLastEdited(Instant.now());
                return orderRepository.save(changed_order);
            }
        }

        return new Order();

    }
    

}
