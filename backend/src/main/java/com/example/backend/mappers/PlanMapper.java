package com.example.backend.mappers;

import com.example.backend.dto.PlanResponse;
import com.example.backend.entities.Plan;

public class PlanMapper {

  public static PlanResponse toResponse(Plan plan) {
    return PlanResponse.builder()
      .id(plan.getId())
      .name(plan.getName())
      .priceMonthly(plan.getPriceMonthly())
      .priceYearly(plan.getPriceYearly())
      .billingCycle(plan.getBillingCycle())
      .active(plan.isActive())
      .build();
  }
}
