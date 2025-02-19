package com.software_praktikum.repository;

import com.software_praktikum.model.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserGroupRepository extends JpaRepository<UserGroup, Integer> {
    public List<UserGroup> findByUserUsername(String userName);
}
