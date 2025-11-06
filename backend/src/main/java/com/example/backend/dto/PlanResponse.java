package com.example.backend.dto;

import com.example.backend.entities.BillingCycle;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PlanResponse {

  private Long id;
  private String name;
  private Double priceMonthly;
  private Double priceYearly;
  private BillingCycle billingCycle;
  private boolean active;
}
