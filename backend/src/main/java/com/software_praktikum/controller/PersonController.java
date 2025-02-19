package com.software_praktikum.controller;

import com.software_praktikum.model.Group;
import com.software_praktikum.model.Person;
import com.software_praktikum.repository.GroupRepository;
import com.software_praktikum.repository.OrderRepository;
import com.software_praktikum.repository.PersonRepository;
import com.software_praktikum.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
        return personRepository.findById(personID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Person nicht gefunden"));
    }


    @PutMapping("/create/")
    public Person create(@RequestParam String name,
                         @RequestParam int groupID) {

        Group group = groupRepository.findById(groupID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Gruppe nicht gefunden"));
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

        Person person = personRepository.findById(personID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Person nicht gefunden"));
        if (name != null) person.setName(name);
        if (groupID != null) person.setGroup(groupRepository.findById(groupID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Gruppe nicht gefunden")));

        return personRepository.save(person);

    }

    @PutMapping("/update/json")
    public Person updatePersonByJson(@RequestBody Person person) {

        personRepository.findById(person.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Person nicht gefunden"));

        return personRepository.save(person);
    }

    @DeleteMapping("/delete/{personID}")
    public void delete(@PathVariable("personID") Integer personID) {
        Person person = personRepository.findById(personID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Person nicht gefunden"));
        personRepository.delete(person);
    }


}
