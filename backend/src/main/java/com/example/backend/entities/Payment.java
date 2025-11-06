package com.example.backend.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Double amount;

  @Enumerated(EnumType.STRING)
  private PaymentMethod method;

  @Enumerated(EnumType.STRING)
  private PaymentStatus status;

  private LocalDateTime paidAt;

  private String reference;

  @ManyToOne
  @JoinColumn(name = "invoice_id")
  private Invoice invoice;
}
