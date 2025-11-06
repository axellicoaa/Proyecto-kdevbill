package com.example.backend.dto;

import com.example.backend.entities.BillingCycle;
import com.example.backend.entities.SubscriptionStatus;
import lombok.Data;

@Data
public class SubscriptionUpdateRequest {

  private Long newPlanId; // opcional
  private BillingCycle newBillingCycle; // opcional
  private SubscriptionStatus newStatus; // ACTIVE, PAUSED, CANCELED
}
