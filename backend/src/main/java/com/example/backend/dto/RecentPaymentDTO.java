package com.example.backend.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecentPaymentDTO {

  private String customer; // Nombre del cliente
  private Double amount; // Monto del pago
  private LocalDateTime paidAt; // Fecha/Hora del pago
}
