package com.example.backend.dto;

import com.example.backend.entities.BillingCycle;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PlanCreateRequest {

  @NotBlank
  private String name;

  @NotNull
  private Double priceMonthly;

  @NotNull
  private Double priceYearly;

  @NotNull
  private BillingCycle billingCycle;
}
