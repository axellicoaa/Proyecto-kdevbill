package com.example.backend.repositories;

import com.example.backend.entities.Customer;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
  List<Customer> findByOwnerId(Long ownerId);
  List<Customer> findByOwnerUsername(String username);
}
