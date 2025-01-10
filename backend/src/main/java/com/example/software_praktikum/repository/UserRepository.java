package com.example.software_praktikum.repository;

import com.example.software_praktikum.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}
