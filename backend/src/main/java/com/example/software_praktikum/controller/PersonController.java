package com.example.software_praktikum.controller;

import com.example.software_praktikum.model.Group;
import com.example.software_praktikum.model.Order;
import com.example.software_praktikum.model.Person;
import com.example.software_praktikum.model.User;
import com.example.software_praktikum.repository.GroupRepository;
import com.example.software_praktikum.repository.OrderRepository;
import com.example.software_praktikum.repository.PersonRepository;
import com.example.software_praktikum.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*

Handles all requests related to Person
TODO: return JSON-formatted error messages
 */


@RestController
@RequestMapping("/person/")
public class PersonController {
    private final PersonRepository personRepository;
    private final OrderRepository orderRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public PersonController(PersonRepository personRepository, OrderRepository orderRepository, GroupRepository groupRepository, UserRepository userRepository) {
        this.personRepository = personRepository;
        this.orderRepository = orderRepository;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }


    @GetMapping("")
    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    @GetMapping("/{personID}")
    public Person getPerson(@PathVariable("personID") Integer personID) {
        return personRepository.findById(personID).orElse(null);
    }


    @PutMapping("/create/")
    public Person create(@RequestParam String name,
                         @RequestParam int groupID) {

        Group group = groupRepository.findById(groupID).get();
        Person person = new Person(name, group);
        return personRepository.save(person);

    }

    @PutMapping("/create/json")
    public Person createPersonByJson(@RequestBody Person person) {
        return personRepository.save(person);
    }

    @PutMapping("/update/")
    public Person update(@RequestParam int personID,
                         @RequestParam(required = false) String name,
                         @RequestParam(required = false) Integer groupID) {

        Person person = personRepository.findById(personID).get();
        if (name != null) person.setName(name);
        if (groupID != null) person.setGroup(groupRepository.findById(groupID).get());

        return personRepository.save(person);

    }

    @PutMapping("/update/json")
    public Person updatePersonByJson(@RequestBody Person person) {
        return personRepository.save(person);
    }

    @DeleteMapping("/delete/{personID}")
    public void delete(@PathVariable("personID") Integer personID) {
        Person person = personRepository.findById(personID).get();
        personRepository.delete(person);
    }


}
