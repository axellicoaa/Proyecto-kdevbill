package com.example.backend.mappers;

import com.example.backend.dto.PaymentResponse;
import com.example.backend.entities.Payment;

public class PaymentMapper {

  public static PaymentResponse toResponse(Payment payment) {
    return PaymentResponse.builder()
      .id(payment.getId())
      .customerName(
        payment.getInvoice().getSubscription().getCustomer().getName()
      )
      .planName(payment.getInvoice().getSubscription().getPlan().getName())
      .amount(payment.getAmount())
      .method(payment.getMethod())
      .status(payment.getStatus())
      .paidAt(payment.getPaidAt())
      .reference(payment.getReference())
      .build();
  }
}
