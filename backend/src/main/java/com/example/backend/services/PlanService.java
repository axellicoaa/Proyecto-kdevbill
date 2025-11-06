package com.example.backend.services;

import com.example.backend.dto.PlanCreateRequest;
import com.example.backend.dto.PlanResponse;
import com.example.backend.dto.PlanUpdateRequest;
import com.example.backend.entities.Plan;
import com.example.backend.mappers.PlanMapper;
import com.example.backend.repositories.PlanRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlanService {

  private final PlanRepository planRepository;

  public PlanResponse createPlan(PlanCreateRequest request) {
    Plan plan = Plan.builder()
      .name(request.getName())
      .priceMonthly(request.getPriceMonthly()) // ✅ precio mensual
      .priceYearly(request.getPriceYearly()) // ✅ precio anual
      .billingCycle(request.getBillingCycle())
      .active(true)
      .build();

    planRepository.save(plan);
    return PlanMapper.toResponse(plan);
  }

  public List<PlanResponse> getAllPlans() {
    return planRepository
      .findAll()
      .stream()
      .map(PlanMapper::toResponse)
      .toList();
  }

  public PlanResponse updatePlan(Long id, PlanUpdateRequest request) {
    Plan plan = planRepository
      .findById(id)
      .orElseThrow(() -> new RuntimeException("Plan no encontrado"));

    if (request.getName() != null) plan.setName(request.getName());
    if (request.getPriceMonthly() != null) plan.setPriceMonthly(
      request.getPriceMonthly()
    ); // ✅
    if (request.getPriceYearly() != null) plan.setPriceYearly(
      request.getPriceYearly()
    ); // ✅
    if (request.getBillingCycle() != null) plan.setBillingCycle(
      request.getBillingCycle()
    );
    if (request.getActive() != null) plan.setActive(request.getActive());

    planRepository.save(plan);
    return PlanMapper.toResponse(plan);
  }

  public void disablePlan(Long id) {
    Plan plan = planRepository
      .findById(id)
      .orElseThrow(() -> new RuntimeException("Plan no encontrado"));

    plan.setActive(false);
    planRepository.save(plan);
  }
}
