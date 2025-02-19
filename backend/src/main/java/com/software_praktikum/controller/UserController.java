package com.software_praktikum.controller;

import com.software_praktikum.model.Group;
import com.software_praktikum.model.User;
import com.software_praktikum.model.UserGroup;
import com.software_praktikum.repository.GroupRepository;
import com.software_praktikum.repository.UserGroupRepository;
import com.software_praktikum.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequestMapping("/user/")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserGroupRepository userGroupRepository;
    private final GroupRepository groupRepository;

    public UserController(UserRepository userRepository, UserGroupRepository userGroupRepository, GroupRepository groupRepository) {
        this.userRepository = userRepository;
        this.userGroupRepository = userGroupRepository;
        this.groupRepository = groupRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @GetMapping("")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{userID}")
    public User getUser(@PathVariable("userID") int userID) {

        return userRepository.findById(userID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User nicht gefunden"));

    }

    @PutMapping("/create/")
    public User createUser(@RequestParam String username,
                           @RequestParam String password,
                           @RequestParam Integer privilegeLevel) {


        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(username, hashedPassword, privilegeLevel);
        return userRepository.save(user);
    }

    @PutMapping("/create/json/")
    public User createUserByJson(@RequestBody User newUser) {

        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));

        return userRepository.save(newUser);
    }

    @PutMapping("/password/reset")
    public User resetPassword(@RequestParam String username,
                              @RequestParam String old_password,
                              @RequestParam String new_password) {
        User user = userRepository.findByUsername(username); //geht davon aus, dass Nutzernamen eindeutig sind
        if (user == null) {throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User nicht gefunden");}

        if (!passwordEncoder.matches(old_password, user.getPassword())) {throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Password falsch");}

        user.setPassword(passwordEncoder.encode(new_password));
        return userRepository.save(user);
    }


    @PutMapping("/update")
    public User updateUser(@RequestParam int userID,
                           @RequestParam(required = false) String username,
                           @RequestParam(required = false) Integer privilegeLevel) {
        User user = userRepository.findById(userID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User nicht gefunden"));
        if (username != null) user.setUsername(username);
        if (privilegeLevel != null) user.setPrivilegeLevel(privilegeLevel);

        return userRepository.save(user);

    }

    //TODO: System für Vertretung überlegen
    // hier wird einfach der aktuell Zuständige überschrieben
    @PutMapping("/assignToGroup/{userID}/{groupID}")
    public User assignToGroup(@PathVariable("userID") int userID, @PathVariable("groupID") int groupID) {
        Group group = groupRepository.findById(groupID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Gruppe nicht gefunden"));
        User user = userRepository.findById(userID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User nicht gefunden"));

        UserGroup userGroup = new UserGroup(group, user);

        userGroupRepository.save(userGroup);

        throw new ResponseStatusException(HttpStatus.ACCEPTED, "Gruppe erfolgreich dem User zugewiesen");

    }

    @PutMapping("/update/json/")
    public User UpdateUserByJson(@RequestBody User newUser) {

        userRepository.findById(newUser.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User nicht gefunden"));

        return userRepository.save(newUser);
    }

    @DeleteMapping("/delete/{userID}")
    public void deleteUser(@PathVariable("userID") int userID) {
        User user = userRepository.findById(userID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User nicht gefunden"));

        List<UserGroup> userGroups = userGroupRepository.findByUserUsername(user.getUsername());
        if (!userGroups.isEmpty()) throw new ResponseStatusException(HttpStatus.CONFLICT, "Dieser ist noch Leiter von mindestens einer Gruppe");

        userRepository.deleteById(userID);
    }


}
