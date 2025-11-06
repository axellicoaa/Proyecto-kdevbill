package com.example.backend.dto;

import com.example.backend.entities.PaymentMethod;
import com.example.backend.entities.PaymentStatus;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentResponse {

  private Long id;
  private String customerName;
  private String planName;
  private Double amount;
  private PaymentMethod method;
  private PaymentStatus status;
  private LocalDateTime paidAt;
  private String reference;
}
