package com.example.software_praktikum.controller;

import com.example.software_praktikum.model.User;
import com.example.software_praktikum.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/*

Handles general requests like login

 */



@RestController
@RequestMapping("")
public class GeneralController {
    private final UserRepository userRepository;

    public GeneralController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    //TODO URGENT: Encryption
    @GetMapping("/login")
    public User login(@RequestParam String username, @RequestParam String password) {
        User user = userRepository.findByUsername(username);

        if (user.getPassword().equals(password)) {
            return user;
        }

        return null;

    }

    //TODO
    //reset Password by Admin



}
