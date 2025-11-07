package com.example.backend.repositories;

import com.example.backend.entities.Invoice;
import com.example.backend.entities.InvoiceStatus;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
  // Listar facturas por usuario
  List<Invoice> findBySubscriptionCustomerOwnerId(Long ownerId);

  // Contar abiertas por usuario
  long countByStatusAndSubscriptionCustomerOwnerId(
    InvoiceStatus status,
    Long ownerId
  );

  // Contar abiertas para admin
  long countByStatus(InvoiceStatus status);

  // ✅ Obtener la próxima fecha de factura del usuario
  Optional<
    Invoice
  > findFirstByStatusAndSubscriptionCustomerOwnerIdOrderByDueDateAsc(
    InvoiceStatus status,
    Long ownerId
  );
  boolean existsBySubscriptionIdAndStatus(
    Long subscriptionId,
    InvoiceStatus status
  );
}
