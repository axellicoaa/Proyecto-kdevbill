package com.example.backend.dto;

import com.example.backend.entities.InvoiceStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InvoiceResponse {

  private Long id;
  private String customerName;
  private String planName;
  private Double amount;
  private InvoiceStatus status;
  private LocalDate dueDate;
  private LocalDateTime issuedAt;
}
