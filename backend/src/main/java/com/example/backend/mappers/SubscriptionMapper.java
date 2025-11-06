package com.example.backend.mappers;

import com.example.backend.dto.SubscriptionResponse;
import com.example.backend.entities.Subscription;

public class SubscriptionMapper {

  public static SubscriptionResponse toResponse(Subscription s) {
    return SubscriptionResponse.builder()
      .id(s.getId())
      .customerName(s.getCustomer().getName())
      .planName(s.getPlan().getName())
      .ownerUsername(s.getCustomer().getOwner().getUsername()) // ✅
      .ownerId(s.getCustomer().getOwner().getId()) // ✅
      .status(s.getStatus().name())
      .startDate(s.getStartDate())
      .nextBillingDate(s.getNextBillingDate())
      .createdAt(s.getCreatedAt())
      .build();
  }
}
