package com.example.backend.dto;

import com.example.backend.entities.BillingCycle;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubscriptionResponse {

  private Long id;
  private String customerName;
  private String planName;
  private String ownerUsername; //  agregar esto
  private Long ownerId; //  opcional si lo necesitas
  private String status;
  private LocalDate startDate;
  private LocalDate nextBillingDate;
  private LocalDateTime createdAt;
  private Double monthlyPrice;
  private Double yearlyPrice;
  private BillingCycle billingCycle;
}
