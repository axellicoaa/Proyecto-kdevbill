package com.example.backend.services;

import com.example.backend.dto.SubscriptionCreateRequest;
import com.example.backend.dto.SubscriptionResponse;
import com.example.backend.dto.SubscriptionUpdateRequest;
import com.example.backend.entities.BillingCycle;
import com.example.backend.entities.Customer;
import com.example.backend.entities.Invoice;
import com.example.backend.entities.InvoiceStatus;
import com.example.backend.entities.Plan;
import com.example.backend.entities.Subscription;
import com.example.backend.entities.SubscriptionStatus;
import com.example.backend.mappers.SubscriptionMapper;
import com.example.backend.repositories.CustomerRepository;
import com.example.backend.repositories.InvoiceRepository;
import com.example.backend.repositories.PlanRepository;
import com.example.backend.repositories.SubscriptionRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

  private final SubscriptionRepository subscriptionRepository;
  private final CustomerRepository customerRepository;
  private final PlanRepository planRepository;
  private final InvoiceRepository invoiceRepository;

  public SubscriptionResponse createSubscription(
    SubscriptionCreateRequest request,
    Long userId,
    boolean isAdmin
  ) {
    Customer customer = customerRepository
      .findById(request.getCustomerId())
      .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

    // Solo Admin o dueño del cliente
    if (!isAdmin && !customer.getOwner().getId().equals(userId)) {
      throw new RuntimeException("No autorizado");
    }

    Plan plan = planRepository
      .findById(request.getPlanId())
      .orElseThrow(() -> new RuntimeException("Plan no encontrado"));

    LocalDate startDate = LocalDate.now();
    LocalDate nextBillingDate = request.getBillingCycle() ==
      BillingCycle.MONTHLY
      ? startDate.plusMonths(1)
      : startDate.plusYears(1);

    Subscription subscription = Subscription.builder()
      .customer(customer)
      .plan(plan)
      .billingCycle(request.getBillingCycle()) // ✅ IMPORTANTE
      .status(SubscriptionStatus.ACTIVE)
      .startDate(startDate)
      .nextBillingDate(nextBillingDate)
      .createdAt(LocalDateTime.now())
      .build();

    subscriptionRepository.save(subscription);
    return SubscriptionMapper.toResponse(subscription);
  }

  public List<SubscriptionResponse> getMySubscriptions(
    Long userId,
    boolean isAdmin
  ) {
    if (isAdmin) {
      // ✅ ADMIN ve todas las suscripciones
      return subscriptionRepository
        .findAll()
        .stream()
        .map(SubscriptionMapper::toResponse)
        .toList();
    }

    // ✅ USER ve solo las suyas
    return subscriptionRepository
      .findByCustomerOwnerId(userId)
      .stream()
      .map(SubscriptionMapper::toResponse)
      .toList();
  }

  public List<SubscriptionResponse> getSubscriptionsByCustomer(
    Long customerId,
    Long userId,
    boolean isAdmin
  ) {
    Customer customer = customerRepository
      .findById(customerId)
      .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

    if (!isAdmin && !customer.getOwner().getId().equals(userId)) {
      throw new RuntimeException("No autorizado");
    }

    return subscriptionRepository
      .findByCustomerId(customerId)
      .stream()
      .map(SubscriptionMapper::toResponse)
      .toList();
  }

  public SubscriptionResponse updateSubscription(
    Long id,
    SubscriptionUpdateRequest request,
    Long userId,
    boolean isAdmin
  ) {
    Subscription subscription = subscriptionRepository
      .findById(id)
      .orElseThrow(() -> new RuntimeException("Suscripción no encontrada"));

    // Solo ADMIN o dueño puede modificar
    if (
      !isAdmin && !subscription.getCustomer().getOwner().getId().equals(userId)
    ) {
      throw new RuntimeException("No autorizado");
    }

    // Cambiar plan
    if (request.getNewPlanId() != null) {
      Plan newPlan = planRepository
        .findById(request.getNewPlanId())
        .orElseThrow(() -> new RuntimeException("Plan no encontrado"));
      subscription.setPlan(newPlan);
    }

    // Cambiar ciclo de facturación y recalcular siguiente fecha
    if (request.getNewBillingCycle() != null) {
      subscription.setNextBillingDate(
        request.getNewBillingCycle() == BillingCycle.MONTHLY
          ? subscription.getStartDate().plusMonths(1)
          : subscription.getStartDate().plusYears(1)
      );
    }

    // Cambiar estado
    if (request.getNewStatus() != null) {
      subscription.setStatus(request.getNewStatus());
    }

    subscriptionRepository.save(subscription);
    return SubscriptionMapper.toResponse(subscription);
  }

  public SubscriptionResponse renewSubscription(
    Long id,
    Long userId,
    boolean isAdmin
  ) {
    Subscription subscription = subscriptionRepository
      .findById(id)
      .orElseThrow(() -> new RuntimeException("Suscripción no encontrada"));

    if (
      !isAdmin && !subscription.getCustomer().getOwner().getId().equals(userId)
    ) {
      throw new RuntimeException("No autorizado");
    }

    Plan plan = subscription.getPlan();
    double amount = subscription.getBillingCycle() == BillingCycle.MONTHLY
      ? plan.getPriceMonthly()
      : plan.getPriceYearly();

    Invoice invoice = Invoice.builder()
      .subscription(subscription)
      .amount(amount)
      .status(InvoiceStatus.OPEN)
      .issuedAt(LocalDateTime.now())
      .dueDate(LocalDate.now().plusDays(7))
      .build();

    invoiceRepository.save(invoice);

    // Actualizar fecha de próximo cobro
    subscription.setNextBillingDate(
      subscription.getBillingCycle() == BillingCycle.MONTHLY
        ? subscription.getNextBillingDate().plusMonths(1)
        : subscription.getNextBillingDate().plusYears(1)
    );

    subscriptionRepository.save(subscription);

    return SubscriptionMapper.toResponse(subscription);
  }
}
