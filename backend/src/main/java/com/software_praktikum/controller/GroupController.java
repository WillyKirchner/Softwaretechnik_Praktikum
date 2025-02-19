package com.software_praktikum.controller;

import com.software_praktikum.model.Group;
import com.software_praktikum.model.Person;
import com.software_praktikum.repository.GroupRepository;
import com.software_praktikum.repository.PersonRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*

Handles all requests related to Group<->Person relationship
TODO: return JSON-formatted error messages
 */


@RestController
@RequestMapping("/person-group/")
public class GroupController {

    private final GroupRepository groupRepository;
    private final PersonRepository personRepository;

    public GroupController(GroupRepository groupRepository, PersonRepository personRepository) {
        this.groupRepository = groupRepository;
        this.personRepository = personRepository;
    }

    @GetMapping("")
    public List<Group> getAll() {
        return groupRepository.findAll();
    }

    @GetMapping("/{groupID}/")
    public Group getById(@PathVariable int groupID) {
        return groupRepository.findById(groupID).get();
    }

    @PutMapping("/create/")
    public Group create(@RequestParam String groupAlias) {
        Group group = new Group();
        group.setGroupAlias(groupAlias);

        return groupRepository.save(group);
    }

    @GetMapping("/{groupID}/persons")
    public List<Person> getPersons(@PathVariable int groupID) {
        Group group = groupRepository.findById(groupID).get();
        return personRepository.findAllByGroup(group);
    }


}
