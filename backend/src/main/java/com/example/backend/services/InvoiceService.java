package com.example.backend.services;

import com.example.backend.dto.InvoiceResponse;
import com.example.backend.entities.Invoice;
import com.example.backend.entities.InvoiceStatus;
import com.example.backend.entities.Payment;
import com.example.backend.entities.PaymentMethod;
import com.example.backend.entities.PaymentStatus;
import com.example.backend.mappers.InvoiceMapper;
import com.example.backend.repositories.InvoiceRepository;
import com.example.backend.repositories.PaymentRepository;
import com.example.backend.repositories.SubscriptionRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InvoiceService {

  private final InvoiceRepository invoiceRepository;
  private final SubscriptionRepository subscriptionRepository;
  private final PaymentRepository paymentRepository;

  public List<InvoiceResponse> getInvoices(Long userId, boolean isAdmin) {
    return (
      isAdmin
        ? invoiceRepository.findAll()
        : invoiceRepository.findBySubscriptionCustomerOwnerId(userId)
    ).stream()
      .map(InvoiceMapper::toResponse)
      .toList();
  }

  public InvoiceResponse getInvoice(Long id, Long userId, boolean isAdmin) {
    Invoice invoice = invoiceRepository
      .findById(id)
      .orElseThrow(() -> new RuntimeException("Factura no encontrada"));

    if (
      !isAdmin &&
      !invoice.getSubscription().getCustomer().getOwner().getId().equals(userId)
    ) {
      throw new RuntimeException("No autorizado");
    }

    return InvoiceMapper.toResponse(invoice);
  }

  public InvoiceResponse payInvoice(Long id, Long userId, boolean isAdmin) {
    Invoice invoice = invoiceRepository
      .findById(id)
      .orElseThrow(() -> new RuntimeException("Factura no encontrada"));

    if (
      !isAdmin &&
      !invoice.getSubscription().getCustomer().getOwner().getId().equals(userId)
    ) {
      throw new RuntimeException("No autorizado");
    }

    if (invoice.getStatus() != InvoiceStatus.OPEN) {
      throw new RuntimeException(
        "Solo se pueden pagar facturas en estado OPEN"
      );
    }

    invoice.setStatus(InvoiceStatus.PAID);

    Payment payment = Payment.builder()
      .invoice(invoice)
      .amount(invoice.getAmount())
      .status(PaymentStatus.SUCCESS)
      .method(PaymentMethod.CARD)
      .paidAt(LocalDateTime.now())
      .reference(UUID.randomUUID().toString())
      .build();

    paymentRepository.save(payment);
    invoiceRepository.save(invoice);

    return InvoiceMapper.toResponse(invoice);
  }
}
