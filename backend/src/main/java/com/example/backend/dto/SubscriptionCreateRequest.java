package com.example.backend.dto;

import com.example.backend.entities.BillingCycle;
import lombok.Data;

@Data
public class SubscriptionCreateRequest {

  private Long customerId;
  private Long planId;
  private BillingCycle billingCycle; // MONTHLY or YEARLY
}
