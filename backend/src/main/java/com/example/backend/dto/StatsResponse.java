package com.example.backend.dto;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StatsResponse {

  private Long subscriptions;
  private Long invoicesOpen;
  private Long payments;
  private Double revenue;
  private Map<String, Long> subscriptionsByPlan; // solo Admin
  private List<RecentPaymentDTO> recentPayments;
  private String nextInvoiceDate; // solo User
}
