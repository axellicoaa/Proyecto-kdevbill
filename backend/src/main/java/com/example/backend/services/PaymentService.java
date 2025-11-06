package com.example.backend.services;

import com.example.backend.dto.PaymentResponse;
import com.example.backend.entities.Payment;
import com.example.backend.mappers.PaymentMapper;
import com.example.backend.repositories.PaymentRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {

  private final PaymentRepository paymentRepository;

  public List<PaymentResponse> getPayments(Long userId, boolean isAdmin) {
    // ADMIN ve todo
    if (isAdmin) {
      return paymentRepository
        .findAll()
        .stream()
        .map(PaymentMapper::toResponse)
        .toList();
    }

    // USER solo ve pagos de sus clientes
    return paymentRepository
      .findByInvoiceSubscriptionCustomerOwnerId(userId)
      .stream()
      .map(PaymentMapper::toResponse)
      .toList();
  }

  public PaymentResponse getPaymentById(Long id, Long userId, boolean isAdmin) {
    Payment payment = paymentRepository
      .findById(id)
      .orElseThrow(() -> new RuntimeException("Pago no encontrado"));

    Long ownerId = payment
      .getInvoice()
      .getSubscription()
      .getCustomer()
      .getOwner()
      .getId();

    if (!isAdmin && !ownerId.equals(userId)) {
      throw new RuntimeException("No autorizado");
    }

    return PaymentMapper.toResponse(payment);
  }
}
