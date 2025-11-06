package com.example.backend.mappers;

import com.example.backend.dto.InvoiceResponse;
import com.example.backend.entities.Invoice;

public class InvoiceMapper {

  public static InvoiceResponse toResponse(Invoice invoice) {
    return InvoiceResponse.builder()
      .id(invoice.getId())
      .customerName(invoice.getSubscription().getCustomer().getName())
      .planName(invoice.getSubscription().getPlan().getName())
      .amount(invoice.getAmount())
      .status(invoice.getStatus())
      .dueDate(invoice.getDueDate())
      .issuedAt(invoice.getIssuedAt())
      .build();
  }
}
