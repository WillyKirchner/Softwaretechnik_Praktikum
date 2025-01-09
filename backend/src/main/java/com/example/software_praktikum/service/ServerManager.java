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
        // Simulate sending order to the kitchen client
        System.out.println("Order sent to kitchen: " + order.getOrderID());
    }

    public void sendErrorToKitchenClient(Order order) {
        System.out.println("Error for order " + order.getOrderID() + " sent to kitchen.");
    }

    public void updateDeliveryStatus(User user, int newStatus) {
        Order todaysOrder = getTodaysOrderFromUser(user);
        if (todaysOrder != null) {
            System.out.println("Updated delivery status for order " + todaysOrder.getOrderID() + " to status " + newStatus);
        }
    }

    public void changeOrderForUser(User user, int orderId, Order newOrder) {
        Order order = orderRepository.findByOrderID(orderId);
        if (order != null && order.getWhoOrdered().equals(user)) {
            order.setMealName(newOrder.getMealName());
            order.setSalat(newOrder.isSalat());
            orderRepository.save(order);
            System.out.println("Order updated for user " + user.getName());
        }
    }

    public void deleteOrderForUser(User user, int orderId) {
        Order order = orderRepository.findByOrderID(orderId);
        if (order != null && order.getWhoOrdered().equals(user)) {
            orderRepository.delete(order);
            System.out.println("Order " + orderId + " deleted for user " + user.getName());
        }
    }

    public void placeNewOrderForUser(User user, Order newOrder) {
        newOrder.setWhoOrdered(user);
        orderRepository.save(newOrder);
        System.out.println("New order placed by user " + user.getName());
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
            System.out.println("User ID changed from " + oldId + " to " + newID);
        }
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
        System.out.println("User " + id + " deleted.");
    }

    public LeadingUser registerNewLeadingUser(int privilegeLevel, String name, int[] groupMembers) {
        LeadingUser leadingUser = new LeadingUser(0, name, privilegeLevel, "password", groupMembers);
        return (LeadingUser) userRepository.save(leadingUser);
    }

    public void addUserToGroup(LeadingUser groupChairman, int userID) {
        System.out.println("User " + userID + " added to the group of " + groupChairman.getName());
    }

    public void createHierarchyView(int id) {
        System.out.println("Hierarchy view for user " + id);
    }
}