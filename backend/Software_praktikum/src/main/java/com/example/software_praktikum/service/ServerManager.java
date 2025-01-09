package com.example.software_praktikum.service;

import com.example.software_praktikum.model.LeadingUser;
import com.example.software_praktikum.model.Order;
import com.example.software_praktikum.model.User;
import com.example.software_praktikum.repository.OrderRepository;
import com.example.software_praktikum.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServerManager {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    @Autowired
    public ServerManager(UserRepository userRepository, OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    public User getUserFromId(int id) {
        return userRepository.findById(id).orElse(null);
    }

    public Order getTodaysOrderFromUser(User user) {
        List<Order> orders = orderRepository.findByWhoOrdered(user);
        return orders.isEmpty() ? null : orders.get(0);
    }

    public void sendOrderToKitchenClient(Order order) {

    public void sendErrorToKitchenClient(Order order) {
    }

        public void updateDeliveryStatus(User user, int newStatus) {
            Order todaysOrder = getTodaysOrderFromUser(user);
            if (todaysOrder != null) {
                //   status logic for database
            }
        }

        public void changeOrderForUser(User user, int orderId, Order newOrder) {
        Order order = orderRepository.findByOrderID(orderId);
        if (order != null && order.getWhoOrdered().equals(user)) {
            order.setMealName(newOrder.getMealName());
            order.setSalat(newOrder.isSalat());
            orderRepository.save(order);
        }
    }

    public void deleteOrderForUser(User user, int orderId) {
        Order order = orderRepository.findByOrderID(orderId);
        if (order != null && order.getWhoOrdered().equals(user)) {
            orderRepository.delete(order);
        }
    }

    public void placeNewOrderForUser(User user, Order newOrder) {
        newOrder.setWhoOrdered(user);
        orderRepository.save(newOrder);
    }

    public Order createNewOrder(int orderId, String date, String mealName, boolean salat, User owner) {
        Order newOrder = new Order(date, orderId, mealName, salat, owner);

        return orderRepository.save(newOrder);
    }

    public User registerUser(int id, String name) {
        User newUser = new User(id, name);

        return userRepository.save(newUser);
    }

    public void changeUserId(int oldId, int newID) {
        User user = userRepository.findById(oldId).orElse(null);
        if (user != null) {
            user.setId(newID);
            userRepository.save(user);
        }
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

        public LeadingUser registerNewLeadingUser(int privilegeLevel, String name, String password, int[] groupMembers) {
            // Create a new LeadingUser instance
            LeadingUser leadingUser = new LeadingUser();
            leadingUser.setId(0); // New ID, will be set by the database
            leadingUser.setName(name);
            leadingUser.setPrivilegeLevel(privilegeLevel);
            leadingUser.setPassword(password); // Set the password as plain text
            leadingUser.setControlOver(groupMembers);

            // Save the LeadingUser to the database
            return (LeadingUser) userRepository.save(leadingUser);
        }

    public void addUserToGroup(LeadingUser groupChairman, int userID) {
    }

    public void createHierarchyView(int id) {
    }
}