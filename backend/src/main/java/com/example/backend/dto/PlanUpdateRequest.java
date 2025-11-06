package com.example.backend.dto;

import com.example.backend.entities.BillingCycle;
import lombok.Data;

@Data
public class PlanUpdateRequest {

  private String name;
  private Double priceMonthly;
  private Double priceYearly;
  private BillingCycle billingCycle;
  private Boolean active;
}
