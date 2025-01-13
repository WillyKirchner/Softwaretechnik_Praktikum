package com.example.software_praktikum.controller;

import com.example.software_praktikum.model.User;
import com.example.software_praktikum.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*

Handles all requests related to User

 */


@RestController
@RequestMapping("/user/")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{userID}")
    public User getUser(@PathVariable("userID") int userID) {
        return userRepository.findById(userID).get();
    }

    @PutMapping("/create/")
    public User createUser(@RequestParam String username,
                           @RequestParam String password,
                           @RequestParam Integer privilegeLevel) {

        User user = new User(username, password, privilegeLevel);
        return userRepository.save(user);
    }

    @PutMapping("/update")
    public User updateUser(@RequestParam int userID,
                           @RequestParam(required = false) String username,
                           @RequestParam(required = false) Integer privilegeLevel) {
        User user = userRepository.findById(userID).get();
        if (username != null) user.setUsername(username);
        if (privilegeLevel != null) user.setPrivilegeLevel(privilegeLevel);

        return userRepository.save(user);

    }


}
