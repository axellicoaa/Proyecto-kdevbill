package com.example.backend.repositories;

import com.example.backend.entities.Subscription;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptionRepository
  extends JpaRepository<Subscription, Long> {
  List<Subscription> findByCustomerOwnerId(Long ownerId);

  List<Subscription> findByCustomerId(Long customerId);

  long countByCustomerOwnerId(Long ownerId);
  List<Subscription> findAll();

  @Query(
    "SELECT s.plan.name, COUNT(s) FROM Subscription s GROUP BY s.plan.name"
  )
  List<Object[]> countByPlan();
}
