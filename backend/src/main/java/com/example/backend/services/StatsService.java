package com.example.backend.services;

import com.example.backend.dto.RecentPaymentDTO;
import com.example.backend.dto.StatsResponse;
import com.example.backend.entities.Invoice;
import com.example.backend.entities.InvoiceStatus;
import com.example.backend.entities.Payment;
import com.example.backend.repositories.InvoiceRepository;
import com.example.backend.repositories.PaymentRepository;
import com.example.backend.repositories.SubscriptionRepository;
import com.example.backend.services.StatsServiceI;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatsService implements StatsServiceI {

  private final SubscriptionRepository subscriptionRepository;
  private final InvoiceRepository invoiceRepository;
  private final PaymentRepository paymentRepository;

  @Override
  public StatsResponse getStats(Long userId, boolean isAdmin) {
    long subscriptions = isAdmin
      ? subscriptionRepository.count()
      : subscriptionRepository.countByCustomerOwnerId(userId);

    long invoicesOpen = isAdmin
      ? invoiceRepository.countByStatus(InvoiceStatus.OPEN)
      : invoiceRepository.countByStatusAndSubscriptionCustomerOwnerId(
        InvoiceStatus.OPEN,
        userId
      );

    long payments = isAdmin
      ? paymentRepository.count()
      : paymentRepository.countByInvoiceSubscriptionCustomerOwnerId(userId);

    double revenue = isAdmin
      ? paymentRepository
        .findAll()
        .stream()
        .mapToDouble(Payment::getAmount)
        .sum()
      : paymentRepository
        .findByInvoiceSubscriptionCustomerOwnerId(userId)
        .stream()
        .mapToDouble(Payment::getAmount)
        .sum();

    Map<String, Long> subscriptionsByPlan = isAdmin
      ? subscriptionRepository
        .countByPlan()
        .stream()
        .collect(Collectors.toMap(r -> (String) r[0], r -> (Long) r[1]))
      : null;

    List<Payment> recentPaymentsEntity = isAdmin
      ? paymentRepository.findTop5ByOrderByPaidAtDesc()
      : paymentRepository.findTop5ByInvoiceSubscriptionCustomerOwnerIdOrderByPaidAtDesc(
        userId
      );

    List<RecentPaymentDTO> recentPayments = recentPaymentsEntity
      .stream()
      .map(p ->
        RecentPaymentDTO.builder()
          .customer(p.getInvoice().getSubscription().getCustomer().getName())
          .amount(p.getAmount())
          .paidAt(p.getPaidAt())
          .build()
      )
      .toList();

    String nextInvoiceDate = isAdmin
      ? null
      : invoiceRepository
        .findBySubscriptionCustomerOwnerId(userId)
        .stream()
        .filter(
          inv ->
            inv.getStatus() == InvoiceStatus.OPEN && inv.getDueDate() != null
        )
        .map(Invoice::getDueDate)
        .sorted()
        .findFirst()
        .map(Object::toString)
        .orElse("Sin facturas pendientes");

    return StatsResponse.builder()
      .subscriptions(subscriptions)
      .invoicesOpen(invoicesOpen)
      .payments(payments)
      .revenue(revenue)
      .subscriptionsByPlan(subscriptionsByPlan)
      .recentPayments(recentPayments)
      .nextInvoiceDate(nextInvoiceDate)
      .build();
  }
}
