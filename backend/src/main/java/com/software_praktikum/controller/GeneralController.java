package com.software_praktikum.controller;

import com.software_praktikum.helpers.LoginRequest;
import com.software_praktikum.model.User;
import com.software_praktikum.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

/*

Handles general requests like login
TODO: return JSON-formatted error messages
 */



@RestController
@RequestMapping("")
public class GeneralController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public GeneralController(UserRepository userRepository) {

        this.passwordEncoder = new BCryptPasswordEncoder();
        this.userRepository = userRepository;
    }


    @PostMapping("/login")
    public User login(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername());

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Benutzer nicht gefunden");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Falsches Passwort");
        }

        return user;

    }

    //"Notfall" - Passwortreset durch Admin (privilegeLevel = 4 [vorläufig])
    @GetMapping("/password/reset")
    public User passwordReset(@RequestParam String admin_username,
                              @RequestParam String admin_password,
                              @RequestParam Integer userID,
                              @RequestParam String new_password) {

        int required_privLevel = 4;

        User admin = userRepository.findByUsername(admin_username); //geht davon aus, dass Nutzernamen eindeutig sind
        if (admin == null) {throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin nicht gefunden");}

        if (!passwordEncoder.matches(admin_password, admin.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Falsches Passwort");
        }

        if (admin.getPrivilegeLevel() == required_privLevel) {
            User user = userRepository.findById(userID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User nicht gefunden"));
            user.setPassword(passwordEncoder.encode(new_password));
            return userRepository.save(user);
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Nicht authorisiert");
    }

}
