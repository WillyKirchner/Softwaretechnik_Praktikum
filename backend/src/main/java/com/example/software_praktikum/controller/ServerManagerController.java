package com.example.software_praktikum.controller;

// import com.example.software_praktikum.model.LeadingUser;
import com.example.software_praktikum.model.Order;
import com.example.software_praktikum.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/server-manager")
public class ServerManagerController {
    /*
    private final ServerManager serverManager;

    @Autowired
    public ServerManagerController(ServerManager serverManager) {
        this.serverManager = serverManager;
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable int id) {
        return serverManager.getUserFromId(id);
    }

    @GetMapping("/orders/today/{userId}")
    public Order getTodaysOrder(@PathVariable int userId) {
        User user = serverManager.getUserFromId(userId);
        return serverManager.getTodaysOrderFromUser(user);
    }

    @PostMapping("/orders")
    public Order createOrder(
            @RequestParam int orderId,
            @RequestParam String date,
            @RequestParam String mealName,
            @RequestParam boolean salat,
            @RequestParam int ownerId
    ) {
        User owner = serverManager.getUserFromId(ownerId);
        return serverManager.createNewOrder(orderId, date, mealName, salat, owner);
    }

    @PostMapping("/users/register")
    public User registerUser(@RequestParam int id, @RequestParam String name) {
        return serverManager.registerUser(id, name);
    }

    @PutMapping("/orders/{orderId}/status")
    public void updateDeliveryStatus(
            @PathVariable int orderId,
            @RequestParam int userId,
            @RequestParam int newStatus
    ) {
        User user = serverManager.getUserFromId(userId);
        serverManager.updateDeliveryStatus(user, newStatus);
    }

    @DeleteMapping("/orders/{orderId}")
    public void deleteOrder(@PathVariable int orderId, @RequestParam int userId) {
        User user = serverManager.getUserFromId(userId);
        serverManager.deleteOrderForUser(user, orderId);
    }

    @PostMapping("/users/{userId}/orders")
    public void placeOrder(@PathVariable int userId, @RequestBody Order order) {
        User user = serverManager.getUserFromId(userId);
        serverManager.placeNewOrderForUser(user, order);
    }

    @PutMapping("/orders/{orderId}")
    public void changeOrder(
            @PathVariable int orderId,
            @RequestParam int userId,
            @RequestBody Order newOrder
    ) {
        User user = serverManager.getUserFromId(userId);
        serverManager.changeOrderForUser(user, orderId, newOrder);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable int id) {
        serverManager.deleteUser(id);
    }

    @PostMapping("/users/leading")
    public LeadingUser registerNewLeadingUser(
            @RequestParam int privilegeLevel,
            @RequestParam String name,
            @RequestBody int[] groupMembers
    ) {
        return serverManager.registerNewLeadingUser(privilegeLevel, name, groupMembers);
    }

    @PostMapping("/users/{userId}/groups")
    public void addUserToGroup(
            @RequestBody LeadingUser groupChairman,
            @PathVariable int userId
    ) {
        serverManager.addUserToGroup(groupChairman, userId);
    }

    @GetMapping("/users/{id}/hierarchy")
    public void createHierarchyView(@PathVariable int id) {
        serverManager.createHierarchyView(id);
    }

     */
}
