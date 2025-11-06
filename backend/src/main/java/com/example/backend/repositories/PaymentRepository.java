package com.example.backend.repositories;

import com.example.backend.entities.Payment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
  List<Payment> findByInvoiceSubscriptionCustomerOwnerId(Long ownerId);

  long countByInvoiceSubscriptionCustomerOwnerId(Long ownerId);

  long count(); // admin

  // ✅ Últimos pagos (ADMIN)
  List<Payment> findTop5ByOrderByPaidAtDesc();

  // ✅ Últimos pagos (USER)
  List<Payment> findTop5ByInvoiceSubscriptionCustomerOwnerIdOrderByPaidAtDesc(
    Long ownerId
  );
}
